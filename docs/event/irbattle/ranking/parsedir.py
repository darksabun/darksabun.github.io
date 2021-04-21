# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 02:42:21 2021

@author: arctiidae5fury
"""

import requests                  # 웹 페이지의 HTML을 가져오는 모듈
from bs4 import BeautifulSoup    # HTML을 파싱하는 모듈
import json

dataJsonRoute='parseData.json'
settingJsonRoute='setting.json'

with open(settingJsonRoute) as sett:
    json_data = json.load(sett)
    dataJsonRoute = json_data["json_save"]
    md5list=json_data["parsed_md5_list"]
    pointfmls=json_data["score_calculate"]
         
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
                lamp=tds[3].text
                scoreraw= tds[5].text; score=int(scoreraw.split('/')[0]) #score
                mcraw=tds[6].text; mc=int(mcraw.split('/')[0]) #maxcombo
                notes=int(mcraw.split('/')[1])
                bp=int(tds[7].text)
                data.append([lr2id,player, lamp, score, mc, bp, notes])    # data 리스트에 추가
    return [title, data]
titles=[]
testdata=[]
for md5 in md5list: 
    titles.append(getIRdata(md5)[0])
    dat=getIRdata(md5)[1]
    testdata.append(dat)
ptsdata={}
bmscount=0
for TT in testdata: #calculate points
    for T in TT:  
        try: ptsdata[T[0]]
        except: 
            ptsdata[T[0]]=[0]*(len(md5list)+2)
            ptsdata[T[0]][len(md5list)+1]=T[1]
        #[0]=LR2ID, [1]=name, [2]=lamp, [3]=score, [4]=mc, [5]=bp, [6]=notes
        points=eval(pointfmls[bmscount])
        #points=50*(1-T[5]/T[6])+25*T[3]/T[6] #포인트=40*(1-BP레이트)/+40*스코어레이트+20*log(맥스콤보/전체노트)
        ptsdata[T[0]][bmscount]=round(points,2)
        ptsdata[T[0]][len(md5list)]+=points
    bmscount+=1
js='['
for k in ptsdata: #prepare dataJson
    js+='{"lr2id": "'+str(k)+'"'
    js+=', "player": "'+ptsdata[k][len(md5list)+1]+'"'
    for i in range(len(ptsdata[k])-2):
        key=', "point'+'0'*(2-len(str(i+1)))+str(i+1)+'": '
        js+=key+'"'+str(ptsdata[k][i])+'"'
    key=', "totalpoint": '
    js+=key+'"'+str(round(ptsdata[k][-2],2))+'"'
    js+='}, '
jsOut=js[:-2]+']'

with open(dataJsonRoute, 'w', encoding='utf-8') as f:
    f.write(jsOut)
    f.close