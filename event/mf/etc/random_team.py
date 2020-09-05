# -*- coding: utf-8 -*-
"""
Created on Mon Jul 20 01:35:23 2020

@author: arctiidae5fury
"""
import random

participants = ['2RLZ', 'alt', 'DK','hex', 'Lapis', 'Lennon', 'Mallow♪', 
     'Mary_Sue(147889)','Razryn','Restia','SANY_paro','Seraphin','Triforce','w']

print('Team 1: LuvTek, И')
for i in range(int(len(participants)/2)):
    team=[]
    a=random.randint(0,len(participants)-1)
    aa=participants[a]
    participants.pop(a)
    b=len(participants)-1-random.randint(0,len(participants)-1)
    bb=participants[b]
    participants.pop(b)
    print('Team '+str(2+i)+': '+aa+', '+bb)
