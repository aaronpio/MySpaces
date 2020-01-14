#!/bin/sh
psql -U labber -d midterm -f db/schema/00_schema.sql
for script in $(ls db/seeds)
do
  psql -U labber -d midterm -f db/seeds/$script
done
