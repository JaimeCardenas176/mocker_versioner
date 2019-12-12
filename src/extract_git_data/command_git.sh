#! /usr/bin/bash
git log --pretty=format:"%cn committed %h at %cd in %f" -n 1 | awk -F' ' '{print $3; print $6; print $7; print $9}'
# %cn -> commiter name
# %h -> short hash
# %cd -> commit date (long format)
# %f -> commited file
# -n 1 represents last commit