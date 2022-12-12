# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 02:42:21 2021

@author: arctiidae5fury
"""

import requests                  # 웹 페이지의 HTML을 가져오는 모듈
from bs4 import BeautifulSoup    # HTML을 파싱하는 모듈
from discord_webhook import DiscordWebhook    # Discord 알림
import json
import math

dataJsonRoute='parseData.json'
settingJsonRoute='setting.json'

with open(settingJsonRoute) as sett:
    json_data = json.load(sett)
    dataJsonRoute = json_data["json_save"]
    md5list=json_data["parsed_md5_list"]
    webhookURL=json_data["discord_webhook_url"]
    mentionUserID=json_data["mention_user"]
    pointfmls=json_data["score_calculate"]
# SEND DISCORD
def senddiscord(sendcontent):
    webhook = DiscordWebhook(url=webhookURL, content=sendcontent)
    webhook.execute()
         
# 웹 페이지를 가져온 뒤 BeautifulSoup 객체로 만듦
def getIRdata(bmsmd5):
    url='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5='+bmsmd5
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    title = str(soup.find('h1'))[4:-5]
    tables = soup.find_all('table')
    table=tables[3]
    data = []
                           # 데이터를 저장할 리스트 생성
    for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 기록을 가져옴)
        tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦
        for td in tds:                   # <td> 태그 리스트 반복
            if td.find('a'):             # <td> 안에 <a> 태그가 있으면
                lr2idR=str(td)[49:56]; lr2id=int(lr2idR.split('"')[0])
                player = td.find('a').text    # <a> 태그 안에서 지점을 가져옴
                lamp=tds[3].text; 
                if lamp[0:2]=='FA': clear=0
                elif lamp[0]=='E': clear=1
                elif lamp[0]=='C': clear=2
                elif lamp[0]=='H': clear=3
                elif lamp[0]=='F': clear=4
                else: clear=5
                scoreraw= tds[5].text; score=int(scoreraw.split('/')[0]) #score
                mcraw=tds[6].text; mc=int(mcraw.split('/')[0]) #maxcombo
                notes=int(mcraw.split('/')[1])
                bp=int(tds[7].text)
                option=tds[14].text; is_sran=1 if option[0]=="S" else 0
                data.append([lr2id,player, clear, score, mc, bp, notes, is_sran])    # data 리스트에 추가
    return [title, data]

titles=[]
testdata=[]
for md5 in md5list: 
    irdata2=getIRdata(md5)
    titles.append(irdata2[0])
    dat=irdata2[1]
    testdata.append(dat)
ptsdata={}
bmscount=0
lvls=[0,18,37,63,82]
for TT in testdata: #calculate points
    for T in TT:  
        try: ptsdata[T[0]]
        except: 
            ptsdata[T[0]]=[0]*(len(md5list)+6)
            ptsdata[T[0]][len(md5list)+5]=T[1]
        #[0]=LR2ID, [1]=name, [2]=lamp, [3]=score, [4]=mc, [5]=bp, [6]=notes
        clear=T[2]; score=T[3]; combo=T[4]; bp=T[5]; notes=T[6]; is_sran=T[7]; rate = score / notes / 2
        points=eval(pointfmls[bmscount])
        ptsdata[T[0]][bmscount]=round(points,2)
        for abcd in range(4):
            if bmscount in range(lvls[abcd],lvls[abcd+1]): ptsdata[T[0]][len(md5list)+abcd]+=points
        ptsdata[T[0]][len(md5list)+4]+=points
    bmscount+=1

js='['
ls=['A','B','C','D']
for k in ptsdata: #prepare dataJson
    js+='{"lr2id": "'+str(k)+'"'
    js+=', "player": "'+str(ptsdata[k][len(md5list)+5])+'"'
    for i in range(len(ptsdata[k])-2):
        key=', "point'+'0'*(2-len(str(i+1)))+str(i+1)+'": ' #곡별 포인트 집계
        js+=key+str(ptsdata[k][i])
    for abcd in range(4):
        key=', "total'+ls[abcd]+'": '
        js+=key+str(round(ptsdata[k][-2-(4-abcd)],2)) #레벨 별 총 포인트 집계
    key=', "totalpoint": '
    js+=key+str(round(ptsdata[k][-2],2)) #총 포인트 집계
    js+='}, '
jsOut=js[:-2]+']'

with open(dataJsonRoute, 'w', encoding='utf-8') as f:
    f.truncate(0) 
    f.write(jsOut)
    f.close
message='<@!'+mentionUserID+'> IR Parsing Complete!\n'
for songno in range(len(titles)):
    message+='#'+str(songno+1)+': '+titles[songno][:16]+'\n'
senddiscord(message[:-1])
