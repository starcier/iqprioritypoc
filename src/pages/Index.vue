<template>
  <Layout>
    <div class="graphs">
      <div class="graph-left">
        <div class="open-claim">
          <div class="claim left">
          <p class="graph-header">Open Claims</p>
          <div class="graph-blue graph-grid">
             <div id="table1" class="spark-cont"></div>
              <div class="claim-txt">
                <p class="claim-txt-p">152</p>
                <span>3mo Avg</span>
              </div>
          </div>
          </div>
        </div>
        <div class="low-severity">
          <div class="claim left">
          <p class="graph-header">Low Severity</p>
          <div class="graph-green graph-grid">
            <div id="table2" class="spark-cont"></div>
            <div class="claim-txt">
              <p class="claim-txt-p">23</p>
              <span>3mo Avg</span>
            </div>
          </div>
          </div>

        </div>
        <div class="high-severity">
          <div class="claim left">
          <p class="graph-header">High Severity</p>
          <div class="graph-red graph-grid">
            <div id="table3" class="spark-cont"></div>
            <div class="claim-txt">
              <p class="claim-txt-p">5</p>
              <span>3mo Avg</span>
            </div>
          </div>
          </div>

        </div>
      
        <div class="litigation-alert">
          <div class="claim left">
          <p class="graph-header">Litigation Alert</p>
          <div class="graph-purple graph-grid">
            <div id="table4" class="spark-cont"></div>
            <div class="claim-txt">
              <p class="claim-txt-p">9</p>
              <span>3mo Avg</span>
            </div>
          </div>
          </div>

        </div>
      </div>
      <div class="graph-right">
           <div class="severity-breakdown">
          <p class="graph-header">Severity Breakdown</p>
          <div class="sev-bar">
            <div class="green-bar"></div>
            <div class="orange-bar"></div>
            <div class="redish-bar"></div>
            <div class="red-bar"></div>
          </div>
          <div class="sever-percantage">
            <div class="low-percent">
              <p class="graph-header">Low Severity</p>
              <p class="low-green green-col">
                51.5% <span>23</span>
              </p>
            </div>
            <div class="low-percent">
              <p class="graph-header">Medium Severity</p>
              <p class="medium-orange  orange-col">
                33% <span>14</span>
              </p>
            </div>
            <div class="low-percent">
              <p class="graph-header">High Severity</p>
              <p class="high-red redish-col">
                12% <span>5</span>
              </p>
            </div>
            <div class="low-percent">
              <p class="graph-header">Ultra-High Severity</p>
              <p class="ultra-red red-col">
                3.5% <span>1</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="filter-nav">
      <p class="exm-overview">Open Claim Book</p>
      <div class="exam-container">
      <p class="exm-overview">Examiner Overview</p>
      <p class="exam-owner">S. Stokes</p>
      </div>
      <ul class="filter-list">
        <li class="filter-all">All</li>
        <li class="fliter-low-sev">Low Severity</li>
        <li class="fliter-medium-sev">Medium Severity</li>
        <li class="fliter-high-sev">High Severity</li>
        <li class="fliter-ultra-sev">Ultra-High Severity</li>
      </ul>
    </div>

    <div class="eq-table">
      <div class="container">
        <div class="bar-filter">
          <div class="row alert" @click="sort('alert')">
            <p>Alert</p>
          </div>
          <div class="row bar-id">
            <p>Claim ID</p>

          </div>
          <div class="row bar-name" @click="sort('title')"><p>Claimant Name</p></div>
          <div class="row bar-adjuster " @click="sort('adjuster')">
            <p>Adjuster</p>
          </div>
          <div class="row bar-age" @click="sort('claimDate')">
            <p>Claim Age</p>
          </div>
          <div class="row bar-stage"  @click="sort('stage')">
            <p>Stage</p>
          </div>
          <div class="row bar-severity" @click="sort('severity')">
            <p>Severity</p>
          </div>
          <div class="row bar-risk" @click="sort('litigationRisk')"><p>Ligitation risk</p></div>
          <div class="row"><span class="empty"></span></div>
        </div>
        <div class="data-loop" v-for="edge in isAscending" :key="edge.node.id" :class="{'lig' : (edge.node.alert=='Litigation') ,'esc' : (edge.node.alert=='Escalation')}">
          <div class="row">
            <p class="alert" >{{edge.node.alert}}</p>
          </div>
        <div class="row claim-id"><button @click="$router.push(`/airdatas/${edge.node.id}`)" >{{edge.node.claimId}}</button></div>
            <div class="row name">{{edge.node.title}}</div>
        <div class="row adjuster" >{{edge.node.adjuster}}</div>
        <div class="row claim-date" >{{formatDate(edge.node.claimDate)}} days</div>
        <div class="row stage" 
        :class="{'intake' : (edge.node.stage=='Intake') ,'initial-set' : (edge.node.stage=='Initial Settlement'),
        'closing' : (edge.node.stage=='Closing'),
        'fact-finding' : (edge.node.stage=='Fact Finding'),
        'negotiation' : (edge.node.stage=='Negotiation')
        
        
         }">
        {{edge.node.stage}}
        
        </div>
        <div class="row severity">  
          <p class="low" v-if="isLow===edge.node.severity"> Low Severity, $1k - $3k</p>
          <p class="medium" v-if="isMedium===edge.node.severity">Medium Severity, $20k - $35k</p>
          <p class="hight" v-if="isHigh===edge.node.severity">High Severity, $45k - $89k</p>
          <p class="ult-hight" v-if="isUltra===edge.node.severity">Ultra - High Severity, $35k - $100k</p>
       
          
          
          
          
          </div>
        <div class="row risk" >
          <p class="low-risk" v-if="isLow===edge.node.litigationRisk">Low</p>
          <p class="medium-risk" v-if="isMedium===edge.node.litigationRisk">Medium</p>
          <p class="high-risk" v-if="isHigh===edge.node.litigationRisk">High</p>
          <p class="imm-risk" v-if="isImmenent===edge.node.litigationRisk">Imminent</p>
          </div>
        <div class="row"><span class="sub-menu"></span></div>

        </div>
      </div>
    </div>


  </Layout>
</template>
<page-query>
query{
  airT:allAirData{
    edges{
      node{
        id
        title
        claimId
        stage
        alert
        severity
        adjuster
        claimDate
        litigationRisk
        
      }
    }
    
  }
}

</page-query>

<script>

import moment from 'moment'
import barChart from '~/components/barChart.vue'
import Highcharts from 'highcharts';
import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

export default {
  
  metaInfo: {
    title: 'IQPriority by EvolutionIQ'
  },
  components:{
    barChart

  },
  data(){
    return{
    isLow:"1",
    isMedium:"2",
    isHigh:"3",
    isUltra:"4",
    isImmenent:"4",
    currentSort:'node.title',
    currentSortDir:'asc',
    isAscending:[],
    ascendedElement:['title']
    
    }

  },
  methods:{

    formatDate(date){
      let dateNow = moment()
      return dateNow.diff(date, 'days');
    },
    sort:function(s) {
    if(this.ascendedElement.includes(s)){
      this.isAscending = _.orderBy(this.$page.airT.edges,`node.${s}`,'desc')
      const index = this.ascendedElement.indexOf(s);
        if (index !== -1) {
        this.ascendedElement.splice(index, 1);
        }
      }
    else{
      this.isAscending = _.orderBy(this.$page.airT.edges,`node.${s}`,'asc')
      this.ascendedElement.push(s)

    }
    }
    
    },
  computed:{
    orderedClemant:function() {
      
      this.isAscending=_.orderBy(this.$page.airT.edges,'node.title');
    }
  },
  
  mounted(){
    this.isAscending=_.orderBy(this.$page.airT.edges,'node.title');
    window.$ = require('jquery')
    $(function () {

    Highcharts.setOptions({
        chart: {
						margin: [0,20,0,0],
            style: {
                overflow: 'visible'
            }
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            },
            tickLength: 0
        },
        yAxis: {
            title: {
                text: null
            },
            maxPadding: 0,
            minPadding: 0,
            gridLineWidth: 0,
            ticks: false,
            endOnTick: false,
            labels: {
                enabled: false
            },
            min: 0,
            max: 10
        },
        tooltip: {
            formatter: function () {
                if (this.point.date == undefined) {
                    return '<b>' + this.series.name + '</b><br/>' + this.point.y;
                } else {
                    return '<b>' + this.series.name + '</b><br/>' + this.point.date + " - " + this.point.y;
                }
            },
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            hideDelay: 0,
            padding: 0,
            positioner: function (w, h, point) {
                return {
                    x: point.plotX - w / 2,
                    y: point.plotY - h
                };
            }
        },
        plotOptions: {
            series: {
                enableMouseTracking: true,
                lineWidth: 3,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 0,
                        radius: 4
                    }
                },
                marker: {
                    radius: 0,
                }
            }
        }
    });

    var table1 = new Highcharts.Chart({
        chart: {
            renderTo: 'table1',
        },
        yAxis: {
            min: 120,
            max: 200
        },
        series: [{
            lineColor: '#3961CB',
            fillColor: {
                linearGradient: [100, 0, 100, 50],
                stops: [
                    [0, "rgba(0, 143, 249, 0.5)"],
                    [1, "rgba(0, 143, 249, 0)"]
                ]
            },
            type: 'area',
            name: 'Open Claims',
            data: [{
                x: 1,
                y: 157,
                status: "Baseline"
            }, {
                x: 2,
                y: 167,
                status: "Getting Worse",
                date: "8/12/2020"
            }, {
                x: 3,
                y: 162,
                status: "Getting Better",
                date: "9/10/2020"
            }, {
                x: 4,
                y: 151,
                status: "Getting Better",
                date: "10/12/2020"
            }, {
                x: 5,
                y: 140,
                status: "Staying the Same",
                date: "11/12/2020"
            }, {
                x: 6,
                y: 152,
                status: "Staying the Same",
                date: "12/12/2020",
								marker: {
                	enabled: true,
                  radius: 5,
                  symbol: 'circle',
                  fillColor : '#3961CB',
                }
            }]
        }]
    });
    
    var table2 = new Highcharts.Chart({
        chart: {
            renderTo: 'table2',
        },
        yAxis: {
            min: 20,
            max: 40
        },
        series: [{
            lineColor: '#00D08E',
            fillColor: {
                linearGradient: [100, 0, 100, 50],
                stops: [
                    [0, "rgba(0, 208, 142, 0.5)"],
                    [1, "rgba(0, 208, 142, 0)"]
                ]
            },
            type: 'area',
            name: 'Low Severity',
            data: [{
                x: 1,
                y: 31,
                status: "Baseline"
            }, {
                x: 2,
                y: 29,
                status: "Getting Worse",
                date: "8/12/2020"
            }, {
                x: 3,
                y: 33,
                status: "Getting Better",
                date: "9/12/2020"
            }, {
                x: 4,
                y: 36,
                status: "Getting Better",
                date: "10/12/2020"
            }, {
                x: 5,
                y: 35,
                status: "Staying the Same",
                date: "11/12/2020"
            }, {
                x: 6,
                y: 23,
                status: "Staying the Same",
                date: "12/12/2020",
								marker: {
                	enabled: true,
                  radius: 5,
                  symbol: 'circle',
                  fillColor : '#00D08E'
                }
            }]
        }]
    });
    
    var table3 = new Highcharts.Chart({
        chart: {
            renderTo: 'table3',
        },
        series: [{
            lineColor: '#FC5A5A',
            fillColor: {
                linearGradient: [100, 0, 100, 50],
                stops: [
                    [0, "rgba(252, 90, 90, 0.5)"],
                    [1, "rgba(252, 90, 90, 0)"]
                ]
            },
            type: 'area',
            name: 'High Severity',
            data: [{
                x: 1,
                y: 5,
                status: "Baseline"
            }, {
                x: 2,
                y: 4,
                status: "Getting Worse",
                date: "8/12/2020"
            }, {
                x: 3,
                y: 5,
                status: "Getting Better",
                date: "9/12/2020"
            }, {
                x: 4,
                y: 6,
                status: "Getting Better",
                date: "10/12/2020"
            }, {
                x: 5,
                y: 6,
                status: "Staying the Same",
                date: "11/12/2020"
            }, {
                x: 6,
                y: 5,
                status: "Staying the Same",
                date: "12/12/2020",
								marker: {
                	enabled: true,
                  radius: 5,
                  symbol: 'circle',
                  fillColor : '#FC5A5A'
                }
            }]
        }]
    });
    
    var table4 = new Highcharts.Chart({
        chart: {
            renderTo: 'table4',
        },
        series: [{
            lineColor: '#3B3B98',
            fillColor: {
                linearGradient: [100, 0, 100, 50],
                stops: [
                    [0, "rgba(59, 59, 152, 0.5)"],
                    [1, "rgba(59, 59, 152, 0)"]
                ]
            },
            type: 'area',
            name: 'Litigation Alert',
            data: [{
                x: 1,
                y: 3,
                status: "Baseline"
            }, {
                x: 2,
                y: 4,
                status: "Getting Worse",
                date: "8/12/2020"
            }, {
                x: 3,
                y: 3,
                status: "Getting Better",
                date: "9/12/2020"
            }, {
                x: 4,
                y: 2,
                status: "Getting Better",
                date: "10/12/2020"
            }, {
                x: 5,
                y: 6,
                status: "Staying the Same",
                date: "11/12/2020"
            }, {
                x: 6,
                y: 9,
                status: "Staying the Same",
                date: "12/12/2020",
								marker: {
                	enabled: true,
                  radius: 5,
                  symbol: 'circle',
                  fillColor : '#3B3B98'
                }
            }]
        }]
    });

    var i = 0;
    $('.latest-icon').hover(function () {
        var chartName = $(this).parent('td').next().find('div').attr("id");
        var chart = $('#' + chartName).highcharts();
        var lastPt = chart.series[0].data.length - 1;
        chart.series[0].data[lastPt].setState('hover');
        chart.tooltip.refresh(chart.series[0].data[lastPt]);
    }, function () {
        var chartName = $(this).parent('td').next().find('div').attr("id");
        var chart = $('#' + chartName).highcharts();
        var lastPt = chart.series[0].data.length - 1;
        chart.series[0].data[lastPt].setState();
        chart.tooltip.hide();
        /*
        if (i > 0) {
            table1.series[0].data[i-1].setState();
            table1.tooltip.hide();
        }
        if (i == table1.series[0].data.length) {
            i = 0;
        }
        table1.series[0].data[i].setState('hover');
        table1.tooltip.refresh(table1.series[0].data[i]);
        i++;
        */
    });

});
    
  }
}
</script>

<style>
.green-col{
  color:#23d07d
}
.orange-col{
  color: #ff9222;
}
.redish-col{
 color: #ff6565;
}
.red-col{
  color: #fb3232;
}
.home-links a {
  margin-right: 1rem;
}
.graphs{
  margin-bottom: 3em;
}
.graph-left > div {
    position: relative;
}
.graph-left > div,.severity-breakdown{
  background-color:#fff;
  padding: 1em;
  border-radius: 6px;
  box-shadow: 0 0 10px -6px rgb(0 0 0 / 27%);
  font-size: 14px;

}
.severity-breakdown {
    display: flex;
    flex-direction: column;
    height: calc(100% - 2em);
    justify-content: space-between;
}
p.graph-header {
    font-weight: 600;
}

.graph-grid {
    display: grid;
    grid-template-columns: 80% 20%;
}
p.claim-txt-p {
    font-size: 18px;
    font-weight: 500;
    text-align: right;
    padding-right: 10px;
}
.graph-left > div::after {
    content: "\f142";
    font-family: "Font Awesome 5 free";
    font-weight: 900;
    color: #000;
    cursor: pointer;
    padding: 5px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
.claim-txt span {
    color: #BDBFC1;
}
p.low-green,p.medium-orange,p.high-red,p.ultra-red {
    font-size: 18px;
    font-weight: 500;
}
.sev-bar {
    display: flex;
    align-items: center;
    border-radius: 6px;
}
.green-bar {
    height: 30px;
    width: 51.5%;
    background-color: #23d07d;
    border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.orange-bar{
  height: 30px;
  width:33%;
  background-color: #ff9222;
}
.redish-bar{
  height: 30px;
  width: 12%;
  background-color:#ff6565;
}
.red-bar{
  height: 30px;
  width: 3.5%;
  background-color: #fb3232;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.sever-percantage span {
    color: #bbb;
    font-size: 12px;
    font-weight: 500;
}
.sever-percantage {
    display: grid;
    grid-template-columns: repeat(4,1fr);
}
.exam-container{
  display: flex;
  margin-bottom: 1em;
  align-items: center;
  display: none;

}
 .exm-overview{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1em;
}
.exam-container .exam-owner{
  font-size: 20px;
  margin-left: 1em;
  display: flex;

}
.exam-container .exam-owner:after {
  content: "\f0dd";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #000;
  margin-left: 8px;
  margin-top: -3px;
}
.claim-id button {
    background: transparent;
    border: 0;
    font-weight: 600;
    text-transform: unset;
    font-size: 14px;
    padding: 0;
}
.row.bar-name,.row.bar-adjuster,.row.bar-age,.row.bar-stage,.row.bar-severity,.row.bar-risk,.claim-id button,.row.alert {
    cursor: pointer;
}
/* Exam container */
.filter-nav{
  margin-bottom: 1em;
}
.filter-nav .filter-list{
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  display: none;

}
.filter-nav .filter-list li{
  margin-right:.7em;
  background-color: #ececec;
  padding: .2em .5em;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
}
.filter-nav .filter-list .filter-all{
  background-color: #0051b5;
  color: #fff;
}

.container .bar-filter{
  display: flex;
  align-content: center;
  justify-content:space-between;
  background-color:#ececec;
  padding: .5em 1em;
  border-radius: 10px;
  margin-bottom: .5em;

}
.row:not(:last-of-type) {
    width: 15%;
}
.data-loop .row:first-of-type,.bar-filter .row:first-of-type {
    width: 8%;
}
.row.claim-id,.row.bar-id{
    width: 8%;
}
.row.severity,.row.severity,.row.bar-severity {
    width: 20%; 
}
.row.name,.row.bar-name{
  width: 12%;
}
.row.adjuster,.row.bar-adjuster{
    width: 8%;
}
.row.claim-date,.row.bar-age {
    width: 8%;
}
.row.stage,.row.bar-stage {
    margin-left: 20px;
    width: 14%;
}

.container .bar-filter p{
  font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    color: #1d1d1d;
}
.data-loop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
    margin-bottom: .7em;
    border-radius: 4px;
    box-shadow: 0px 3px 10px -6px rgb(0 0 0 / 12%);
}
.data-loop .row{
  font-size: 14px;
  color: #666;
}
.row.name {
    font-weight: 600;
    color: #333;
}
.row.name button {
    background: #fff;
    border: 0;
    cursor: pointer;
}
.row.name button:focus {
    background: #fff;
    border: 0;
    cursor: pointer;
}
.data-loop {
    border-left: 5px solid#0051b5;
}
.data-loop.lig {
    border-left: 5px solid #ff6565;
}
.data-loop.esc {
    border-left: 5px solid #ff9222;
}
.data-loop .alert{
    display: inline;
    padding: 2px 10px;
    border-radius: 5px;  
}
.data-loop.lig p.alert {
    color:  #FC5A5A;
    background-color:#FEDEDE ;  
}
.data-loop.esc p.alert {
    color: #AE6205;
    background-color: #FFEBD8;

}
.row.severity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.row.severity p:before,.filter-list li:not(:first-of-type):before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 5px;
}
.row.severity p.medium::before,.fliter-medium-sev::before {
  background-color:#ffad3b;
}
.row.severity p.low::before,.fliter-low-sev::before {
  background-color:#23d07d;
}
.row.severity p.hight::before,.fliter-high-sev::before {
  background-color:#ff6565;
}
.fliter-ultra-sev::before,.row.severity .ult-hight::before {
  background-color:#fb3232;
}
.row.risk p:before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right: 7px;
    border-radius: 50%;
}
.row.risk p.low-risk::before{
  background-color: #23d07d;
}
.row.risk p.imm-risk::before{
  background-color: #0051b5;
}
.row.risk p.medium-risk::before{
  background-color: #ffad3b;
}
.row.risk p.high-risk::before{
  background-color:#ff6565;
}

.row.stage:before {
    content: "unset";
    color: #0051b5;
    background-color: rgb(22 126 255 / 10%);
    border-radius: 6px;
    padding: 2px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}
.row.stage.initial-set::before{
  content: "\f2b5";
}
.row.stage.intake::before{
  content: "\f0c5";
}
.row.stage.closing::before{
  content: "\f044";
}
.row.stage.negotiation::before{
  content: "\f086";
}
.row.stage.fact-finding::before{
  content: "\f002";
}
span.sub-menu:before {
    content: "\f142";
    font-family: "Font Awesome 5 free";
    font-weight: 900;
    color: #000;
    cursor: pointer;
    padding: 5px;
}
.graphs {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 40px;
}
.graph-left {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 20px;
}
.graph__wrapper {
 
  position: relative;
}
.graph__wrapper svg {
  margin: 0;
}
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 3s ease-in forwards;
  animation-iteration-count: 1;
  animation-delay: 1s;
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
.description {
  font-family: "Roboto";
  color: #b0b0b0;
  text-align: center;
  margin: 40px 0px;
}
.symp {
    vertical-align: middle;
    line-height: 50px;
    padding: 0.5em;
    border-bottom: 1px solid #ddd;
}
.spark-cont {
    height: 50px;
    width: 200px;
    display: inline-block;
    overflow: visible !important;
}
.table > tbody > tr > td {
    vertical-align: middle;
}
</style>
