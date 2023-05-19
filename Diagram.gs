function menu(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({ name: "チャートの作成", functionName: "makeDiagram" });
  menuEntries.push(null); // line separator
  menuEntries.push({ name: "日付リストの作成", functionName: "reverseDiagram" });

  ss.addMenu("日付操作", menuEntries);
}

function makeDiagram() {
  //Logger.log('Making diagram...');
  var ash = SpreadsheetApp.getActiveSpreadsheet():

  var sheets=ash.getSheets();

  const eventlist=[];
  const daylist=[];
  const colorlist=[];
  const arealist=[];

  var scheminrow=2;
  var schemincol=2;
  var schemaxrow=2;
  var schemaxcol=3;
  var i=2;

  var arrayDataAsc = sheets[0].getRange(scheminrow, schemincol,sheets[0].getLastRow()).getValues();
  var arrayDataDesc = sheets[0].getRange(schemaxrow, schemaxcol,sheets[0].getLastRow()).getValues();

  var arrayDataAsc = arrayDataAsc.filter(Date);   
  var arrayDataDesc = arrayDataAsc.filter(Date);

  var arraySortedAsc = arrayDataAsc.sort(function(a,b){return new Date(a)-new Date(b)});
  var arraySortedDesc = arrayDataDesc.sort(function(a,b){return new Date(b)-new Date(a)});

  var daymin =  new Date(arraySortedAsc[0]);
  var daymax =  new Date(arraySortedDesc[0]):

  daymax.setDate(daymax.getDate()+2);

  while(daymin<daymax) 
  {
    daylist.push(''+daymin);
    sheets[2].getRange(1, i).setValue(daymin);
    daymin.setDate(daymin.getDate()+1);
    i+=1;
  }

  //Logger.log('Success dayset');

  var j=2;
 
  while(eventset!=='')
  {
    var eventset=sheets[0].getRange(j,1).getValue();
    sheets[2].getRange(j,1).setValue(eventset);
    eventlist.push(eventset);
    j+=1;
  }

  //Logger.log('Success eventset');

  var k=1;

  while(areaset!=='')
  {
    var areaset=sheets[1].getRange(k,1).getValue();
    arealist.push(areaset);
    var colorset=sheets[1].getRange(k,1).getBackground();
    colorlist.push(colorset);
    k+=1;
  }

  Logger.log(arealist);
  Logger.log(colorlist);

  Logger.log('Success areaset');

  for(var o=2;o<eventlist.length+1;o++)
  {
    var eventsttday=new Date(sheets[0].getRange(o,2).getValue());
    var eventendday=new Date(sheets[0].getRange(o,3).getValue());

    var area=sheets[0].getRange(o,4).getValue();

    var calsttday=daylist.indexOf(''+eventsttday);
    var calendday=daylist.indexOf(''+eventendday);

    var peintcolornum=arealist.indexOf(area);

    for(var l=2;l<=calsttday+1;l++)
    {
      sheets[2].getRange(o,l).setBackground(null);
    }

    for(var n=calsttday+2;n<=calendday+2;n++)
    {
      sheets[2].getRange(o,n).setBackground(colorlist[peintcolornum]);
    }

    for(var m=calendday+3;m<=daylist.length+1;m++)
    {
      sheets[2].getRange(o,m).setBackground(null);
    }
  } 
  //Logger.log('Finish!')
}

function reverseDiagram()
{
  Logger.log('Makeing daylist...');
  var ash = SpreadsheetApp.getActiveSpreadsheet();
  var sheets=ash.getSheets();

  const titles=['events','stt','end','area'];
  const days=[];
  const events=[];
  const areas=[];
  const colors=[];

  var getdaydata=2;
  var geteventdata=2
  var ika=1;
  var tako=1;
  var uni=1;

  for(var t=1;t<=4;t++)
  {
    sheets[0].getRange(1,t).setValue(titles[t-1]);
  }

  Logger.log('Success settitle');

  for(var d=1;d<=3;d++)
  {
    days.push('dummy');
  }

  while(calcell!=='')
  {
    var calcell=sheets[2].getRange(1,getdaydata).getValue();
    days.push(calcell);
    ika+=1;
  }

  Logger.log('Success getdays');

  while(evecell!=='')
  {
    var evecell=sheets[2].getRange(getdaydata,1).getValue();
    sheets[0].getRange(geteventdata,1).setValue(evecell);
    events.push(evecell)
    geteventdata+=1;
  }

  Logger.log('Success getevents');

  ika=1;

  while(setarea!=='')
  {
    var setarea=sheets[1].getRange(ika,1).getValue();
    var setcolor=sheets[1].getRange(ika,1).getBackground();

    areas.push(setarea);
    colors.push(setcolor);

    ika+=1;
  }

  Logger.log('Success setarea')

  for(ika=2;ika<=events.length;ika++)
  {
  var cellcolor=sheets[2].getRange(ika,tako).getBackground();

  while(cellcolor=='#ffffff')
  {
    cellcolor=sheets[2].getRange(ika,tako).getBackground();
    tako+=1;
  }

  uni=tako;

  var evecellcolor=sheets[2].getRange(ika,uni).getBackground();
  sheets[0].getRange(ika,4).setValue(areas[colors.indexOf(evecellcolor)])

  while(evecellcolor!=='#ffffff')
  {
    evecellcolor=sheets[2].getRange(ika,uni).getBackground();
    uni+=1;
  }

  sheets[0].getRange(ika,2).setValue(days[tako]);
  sheets[0].getRange(ika,3).setValue(days[uni-1]);
  }
  Logger.log('Finish!');
}

function myFunction() {
  var ash = SpreadsheetApp.getActiveSpreadsheet();
  var sheets=ash.getSheets();
  var i=1;

  while(eventset!=='')
  {
    var eventset=sheets[0].getRange(i,1).getValue();
    Logger.log(i+"番目のセルに値があります")
    i+=1;
  }

}
