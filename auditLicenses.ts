/* istanbul ignore file */
import { exec } from 'node:child_process';

// list of packages with bizarre licenses or the license plugin couldn't find
// the license, but it has been vetted
const IGNORED_PACKAGES = [
  '@brillout\\/libassert', // MIT
  'require-like', // MIT
];
const IGNORED_PACKAGE_PATTERN = new RegExp(`(${IGNORED_PACKAGES.join('|')})`);

const APPROVED_LICENSES = [
  'MIT',
  'Apache-2.0',
  'ISC',
  'Apache-2.0 AND MIT',
  'MPL-2.0',
  'Python-2.0',
  'CC-BY-4.0',
  'BlueOak-1.0.0',
  'CC-BY-3.0',
  'CC0-1.0',
  '0BSD',
  '(MIT OR CC0-1.0)',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'BSD',
  '\\(AFL-2.1 OR BSD-3-Clause\\)',
  '\\(MIT OR CC0-1.0\\)',
];
const APPROVED_LICENSE_PATTERN = new RegExp(`(^${APPROVED_LICENSES.join('$|^')}$)`, 'i');

/**
 * Ignore these packages because the yarn license plugin doesn't find
 * their license, but it has been vetted.
 * @param packageName to check
 * @returns true if the package should be ignored
 */
function ignorePackage(packageName: string): boolean {
  return IGNORED_PACKAGE_PATTERN.test(packageName);
}

/**
 * Function to check a license.
 * @param license license to check
 * @returns true if the license is valid
 */
function isValidLicense(license: string): boolean {
  return APPROVED_LICENSE_PATTERN.test(license);
}

interface DependencyMetadata {
  value: { locator: string; descriptor: string };
  children: { url: string; vendorName?: string; vendorUrl?: string };
}

interface License {
  value: string;
  children: { [name: string]: DependencyMetadata };
}

interface LicenseCheck {
  isValid: boolean;
  invalidLicenses: string[];
}

exec('yarn licenses list --json --recursive', (err, stdout) => {
  if (err != null) {
    console.error(err);
  }
  const result = stdout
    .split('\n')
    .map((json): License | null => {
      try {
        return JSON.parse(json) as License;
      } catch (err) {
        if (err instanceof SyntaxError && err.message.includes('Unexpected end of JSON input')) {
          return null;
        }
        throw err;
      }
    })
    .filter((data): data is NonNullable<typeof data> => data != null)
    .reduce(
      (memo: LicenseCheck, license) => {
        const ignored = Object.keys(license.children).reduce(
          (memo: boolean, packageName) => memo && ignorePackage(packageName),
          true,
        );
        const isValid = isValidLicense(license.value);
        if (!ignored && !isValid) {
          return {
            isValid: memo.isValid && isValid,
            invalidLicenses: [...memo.invalidLicenses, license.value],
          };
        }
        return memo;
      },
      { isValid: true, invalidLicenses: [] } as const,
    );
  if (!result.isValid) {
    throw new Error(`got invalid licenses ${result.invalidLicenses.toString()}`);
  }
});
