# -*- coding: utf-8 -*-

import random
import datetime
import time

participants = [
    '妖夢', 'Limite', 'zdazwt', 'Lanait', '茨木童子の腕', 'Seori',
    'Mary_Sue(147889)', 'Decimal', '七海', 'tyrcs', 'Atharnal', 'AYhaz'
]

def print_teams(title, participant_list):
    print(f'\n{title}')
    print(f'Time: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print('Team 0: LuvTek, И')
    for i in range(0, len(participant_list), 2):
        print(f'Team {i // 2 + 1}: {participant_list[i]}, {participant_list[i + 1]}')

# Perform 3 test selections
for t in range(1, 4):
    shuffled = participants[:]
    random.shuffle(shuffled)
    print_teams(f'Test Selection #{t} out of 3', shuffled)
    time.sleep(3)

# Perform official selection
shuffled = participants[:]
random.shuffle(shuffled)
print_teams('>>> Official Selection <<<', shuffled)
