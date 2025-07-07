#!/bin/bash
cd /mnt/c/Users/ffg/Downloads/WEM

i=1
for f in *.jpg; do
  nuevo=$(printf "imagen%03d.webp" "$i")
  echo "Convirtiendo: $f -> $nuevo"
  cwebp "$f" -o "$nuevo"
  ((i++))
done
