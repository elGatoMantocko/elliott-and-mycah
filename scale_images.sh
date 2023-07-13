#! /usr/bin/env bash

for file in ./app/images/wedding-pics/*.jpg; do
  ffmpeg -i "$file" -vf scale=20:-1 "./app/images/wedding-pics/$(basename "$file" .jpg)-small.jpg"
done
