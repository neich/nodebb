#!/bin/bash

git checkout ex1-item-view
git rebase master
git push origin --all -f
git checkout ex2-order-detail 
git rebase ex1-item-view 
git push origin --all -f
git checkout ex3-hide-detail 
git rebase ex2-order-detail 
git push origin --all -f
git checkout ex4-create-order  
git rebase ex3-hide-detail  
git push origin --all -f
git checkout ex5-delete-order 
git rebase ex4-create-order 
git push origin --all -f
git checkout master 

