import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import { useState } from 'react';

type Guest = Readonly<{
  id?: string;
  name: string;
  email: string;
  foodChoice: string;
}>;

const guestIsValid = ({ name, email }: Guest) => name !== '' && email != '';

const useTextFieldStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1),
  },
}));

type RsvpFormProps = Readonly<{ onCancel: () => void; onSubmit: (guests: Guest[]) => void }>;
export const RsvpForm = ({ onCancel, onSubmit }: RsvpFormProps) => {
  const textFieldClasses = useTextFieldStyles();
  const [guests, setGuests] = useState<Guest[]>([{ name: '', email: '', foodChoice: '' }]);

  const getUpdateGuestsFunc = (type: 'email' | 'name') => (value: string, index: number) =>
    setGuests([
      ...guests.slice(0, index),
      { ...guests[index], [type]: value },
      ...guests.slice(index + 1, guests.length),
    ]);

  return (
    <>
      <DialogContent>
        <Typography variant="h3" component="h1">
          Respond if you fuckin&apos; please
        </Typography>
        {guests.map((guest, i) => (
          <Box key={i} display="flex">
            <TextField
              classes={textFieldClasses}
              variant="outlined"
              label="Full name"
              value={guest.name || ''}
              onChange={(e) => getUpdateGuestsFunc('name')(e.target.value, i)}
            />
            <TextField
              classes={textFieldClasses}
              variant="outlined"
              label="Email"
              value={guest.email || ''}
              onChange={(e) => getUpdateGuestsFunc('email')(e.target.value, i)}
            />
            <Box my="auto">
              <IconButton
                disabled={i === 0}
                disableRipple
                disableFocusRipple
                onClick={() => setGuests([...guests.slice(0, i), ...guests.slice(i + 1, guests.length)])}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <IconButton onClick={() => setGuests([...guests, { name: '', email: '', foodChoice: '' }])}>
          <AddIcon />
        </IconButton>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        {onSubmit && <Button onClick={() => guests.every(guestIsValid) && onSubmit(guests)}>Submit</Button>}
      </DialogActions>
    </>
  );
};
