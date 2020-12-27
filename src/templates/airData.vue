<template>
<Layout>
  <div class="claim-wrap">
    <div class="claim-nav">
      <ul>
        <li class="claim-active"><g-link to="/">All Claims</g-link></li>
        <li>
          /
        </li>
        <li>Claim {{$page.airData.claimId}}</li>
      </ul>
    </div>
    <div class="wrap-columns">
      <div class="left-col">
        <div class="name-claim">
          <div class="claim-num-wrap">
      <p class="claim-num">Claim {{$page.airData.claimId}}</p>
      <span>Last updated : 23 Hours Ago</span>
    </div>
    <div class="claim-name-wrap">
      <div class="claim-name">
        <h3>{{$page.airData.title}}</h3>
        <p>Southwest Grocery</p>
      </div>
    </div>

        </div>
    
    <div class="claim-date-wrap">
      <div class="claim-loss-wrap">
      <div class="claim-loss-date">
        <p>Date of Loss</p>
        <h4>{{monthsFirst($page.airData.dateOfLoss)}}</h4>
      </div>
      <div class="claim-since-loss">
        <span class="grey-span">Days Since Loss</span>
        <h4>{{formatDate($page.airData.dateOfLoss)}}</h4>
      </div>
      </div>
      <div class="claim-context-wrap white-container-radius">
        <h4>Claim Context</h4>
        <div class="claim-two-col">
        <div class="claim-desc-wrap">
          <span class="grey-span">Loss Description</span>
          <p>{{$page.airData.lossDescription}}</p>
          
        </div>
        <div class="claim-injury-wrap">
          <span class="grey-span">Injury Description</span>
          <p>{{$page.airData.injuryDescription}}</p>
        </div>
        </div>
      </div>
    </div>
    <div class="latest-correspo-wrap white-container-radius">
      <h4>Latest Correspondence</h4>
      <div class="corr-3-col">
      <div class="corr-source">
        <span class="grey-span">Source</span>
        <p>{{$page.airData.source}}</p>
      </div>
      <div class="corr-date">
        <span class="grey-span">Date</span>
       <p>May 14, 2020</p>
      </div>
      <div class="corr-subject">
        <span class="grey-span">Subject</span>
        <p>{{$page.airData.subject}}</p>
      </div>
      </div>
    </div>
    </div>
    <div class="middle-col white-container-radius">
      <div class="project-cost">
        <p class="font-normal">
          Projected Costs
        </p>
        <div class="cost-wrap">
          <h4 class="h4-style">{{$page.airData.projectedCost}}</h4>
          <div class="cost-percent-wrap">
            <span class="percent">25 percentile</span>
            <span class="percent">75 percentile</span>
          </div>
          <div class="bar-perc-wrap">
            <img v-if="isLow===$page.airData.severity" src="../images/bluecost.svg" />
            <img v-if="isMedium===$page.airData.severity" src="../images/medium-sev.svg" />
            <img v-if="isHigh===$page.airData.severity" src="../images/high-sev.svg" />
          </div>
          <div class="pers-wrap-after">
            <h4 >{{$page.airData.projectedCost}}</h4>
          <div class="cost-percent-wrap">
            <span class="percent">25 percentile</span>
            <span class="percent">75 percentile</span>
          </div>
          <div class="cost-drivers-wrap">
            <h5 class="cost-heading">Cost Drivers</h5>
            <div class="cost-driver">
              <div class="cost-num">
                <span>1</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.projectedCost_driver_1}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color red"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>2</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.projectedCost_driver_2}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-80"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>3</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.projectedCost_driver_3}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-78"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>4</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.projectedCost_driver_4}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-78"></div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>


    </div>
    <div class="right-col white-container-radius">
       <p class="font-normal ">
         Litigation
        </p>
        <h4 class="h4-style" :class="{'lig-low' : ($page.airData.litigationRisk==litLow) ,'lig-medium' : ($page.airData.litigationRisk==litMedium),'lig-high' : ($page.airData.litigationRisk==litHigh)}"> Litigation Risk</h4>
          <div class="cost-percent-wrap">
            <span class="percent">{{$page.airData.litigationDescription}}</span>
          </div>
          <div class="tab-lit">
            <ul>
              <li class="tab-lit-active">Overview</li>
              <li>Litigation Analytics</li>
              <li>Claimant Representation</li>
            </ul>
          </div>
          <div class="bar-perc-wrap">
            <img v-if="litLow===$page.airData.litigationStage" src="../images/unlitiget.svg" />
            <img v-if="litMedium===$page.airData.litigationStage" src="../images/attorney-involved.svg" />
            <img v-if="litHigh===$page.airData.litigationStage" src="../images/suid-filled.svg" />
          </div>
          <div class="claim-value-wrap">
            <ul>
              <li><p class="low-unlt" :class="{'lig-low-txt' : ($page.airData.litigationStage==litLow)}">Unlitigated</p> <span>$17,400 Claim Value</span></li>
              <li><p class="attor-inv" :class="{'lig-medium-txt' : ($page.airData.litigationStage==litMedium)}">Attorney Involved</p> <span>$32,000 Claim Value</span></li>
              <li><p class="suit-fill" :class="{'lig-high-txt' : ($page.airData.litigationStage==litHigh)}">Suit Filled</p> <span>$47,000 Claim Value</span></li>
            </ul>
          </div>
              <div class="cost-drivers-wrap">
            <h5 class="cost-heading">Litigation Drivers</h5>
            <div class="cost-driver">
              <div class="cost-num">
                <span>1</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                 {{$page.airData.litigationCost_driver_1}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color red"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>2</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.litigationCost_driver_2}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-80"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>3</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.litigationCost_driver_3}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-78"></div>
                </div>
              </div>
            </div>
             <div class="cost-driver">
              <div class="cost-num">
                <span>4</span>
              </div>
              <div class="cost-content mg-bottom-2">
                <p class="cost-txt">
                  {{$page.airData.litigationCost_driver_4}}
                </p>
                <div class="sev-bar">
                  <div class="sev-bar-color orange orange-78"></div>
                </div>
              </div>
            </div>
          </div>

    </div>



    </div>
    
  </div>
</Layout>
   
</template>


<page-query>
query($id: ID!){
  airData(id:$id){
   id
    claimId
    title
    severity
    litigationRisk
    claimDate
    lossDescription
    injuryDescription
    source
    dateOfLoss
    subject
    projectedCost
    litigationStage
    litigationDescription
    projectedCost_driver_1
    projectedCost_driver_2
    projectedCost_driver_3
    projectedCost_driver_4
    litigationCost_driver_1
    litigationCost_driver_2
    litigationCost_driver_3
    litigationCost_driver_4
  }
  
}

</page-query>

<script>
import moment from 'moment'
export default {
    metaInfo(){
        return{
            title: this.$page.airData.claimId
        }
    },
    data(){
    return{
    isLow:"1",
    isMedium:"2",
    isHigh:"3",
    litLow:"1",
    litMedium:"2",
    litHigh:"3"
    }

  },
     methods:{

       formatDate(date){
        let dateNow = moment()
        return dateNow.diff(date, 'days');
    },
    monthsFirst(date){
      return moment(date).format('MMMM do YYYY')

    }

  },
}
</script>

<style>
h4{
  margin: 0;
}
.claim-wrap {
    background-color: #E8EFF9;
    padding: 1em;
}
.name-claim {
    margin-left: 1rem;
}
.wrap-columns {
    display: grid;
    grid-template-columns: 30% 34% 32%;
    grid-gap: 30px;
}
.claim-nav {
    margin-bottom: 3em;
}
.claim-nav ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
}
.claim-nav ul li:nth-of-type(2) {
    margin: 0 15px;
}

li.claim-active a {
    text-decoration: none;
    color: #2C60D2;
    font-weight: 500;
}
.claim-num-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
p.claim-num {
    color: #75787B;
    font-weight: 700;
    font-size: 18px;
    margin-right: 15px;
}
.claim-num-wrap span {
    font-size: 14px;
    color: #75787b;
}
.claim-name-wrap {
    margin: 1em 0;
}
.claim-name h3 {
    font-size: 28px;
    color: #3D3E3F;
    margin: 0;
    font-weight: 600;
}
.claim-name p {
    color: #707175;
}
.claim-loss-wrap {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 30px;
    margin-top: 1.8em;
}
.claim-loss-date,.claim-since-loss {
    padding: 1em;
    border-radius: 8px;
}
.claim-since-loss h4 {
    font-weight: 400;
}
.claim-loss-date{
  background: linear-gradient(45deg, #3268D6, #5192E7);
    color: #fff;
}
.claim-since-loss{
  background: #fff;
  color: #000;
}
.claim-loss-date h4 {
    font-weight: 400;
}
span.grey-span {
    font-size: 14px;
    color: #B1B2B2;
    font-weight: 500;
}
.claim-loss-date p {
    font-size: 14px;
    font-weight: 500;
    opacity: .7;
}
.claim-context-wrap h4,.latest-correspo-wrap h4 {
    font-size: 25px;
    font-weight: 500;
    color: #3D3E3F;
}
.claim-two-col {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 1em 0;
    grid-gap: 40px;
}
.white-container-radius{
  background:#fff;
  border-radius: 8px;
  padding: 1em;
  margin-top: 1.8em;
}
.h4-style{
  font-size: 25px;
    font-weight: 500;
    color: #3D3E3F;
}
.corr-3-col {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    margin: 1em 0;
    grid-gap: 10px;
}
.corr-source {
    margin-right: .5em;
}
p.font-normal {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 1em;
    color: #3D3E3F;
}
/* bars styling */
.bar-perc-wrap{
  margin-top: 2em;
}
.bar-perc-wrap img {
    width: 100%;
}
span.percent {
    font-size: 12px;
    margin-right: 15px;
}
.pers-wrap-after h4 {
    font-weight: 500;
    font-size: 18px;
    color: #2C60D2;
    text-align: center;
}
.pers-wrap-after .cost-percent-wrap {
    justify-content: center;
    align-items: center;
    display: flex;
}
.pers-wrap-after h4 {
    margin-left: -30px;
}
.pers-wrap-after .percent:first-of-type {
    margin-left: 45px;
}
h5.cost-heading {
    font-weight: 500;
    font-size: 15px;
}
.cost-driver {
    display: flex;
    align-items: flex-start;

}
.cost-num {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FBF9F8;
    color: #2C60D2;
    font-weight: 500;
    border-radius: 8px;
    width: 10%;
    margin-right: 1em;
    padding: .2em;
}
.cost-content {
    width: 90%;
}
p.cost-txt {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
}
.sev-bar {
    height: 10px;
    background-color: #fbf9f8;
    margin-top: 1em;
    border-radius: 8px;
}
.sev-bar-color {
    width: 90%;
    height: 100%;
    border-radius: 8px;
}
.mg-bottom-2{
  margin-bottom: 2em;
}
.sev-bar-color.red{
  background-color: #EC0A0A;
}
.sev-bar-color.orange.orange-80 {
    width: 80%;
    background-color: #FF9A3C;
}
.sev-bar-color.orange.orange-78 {
    width: 76%;
    background-color: #FF9A3C;
}

/* Style for litigation */
.h4-style.lig-low{
  color: #4E8DE6;
}
.h4-style.lig-medium{
  color: #FF9A3C;
}
.h4-style.lig-high{
  color:#EC0A0A;
}
/* tabs */
.tab-lit {
    margin-top: 2em;
}
.tab-lit ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tab-lit ul li {
    color: #2C60D2;
    font-size: 14px;
    font-weight: 400;
    padding: 5px 10px;
    cursor: pointer;
}
.tab-lit ul li.tab-lit-active {
    font-weight: 500;
    border-bottom: 2px solid;
}
.claim-value-wrap ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.claim-value-wrap span {
    font-size: 12px;
}
.claim-value-wrap ul li:nth-of-type(2) {
    margin-left: 20px;
}
.claim-value-wrap ul li p {
    font-size: 16px;
}
p.low-unlt{
  color: #2C60D2;
}
p.attor-inv{
  color: #FF9A3C;
}
p.suit-fill{
  color: #EC0A0A;
}
.lig-low-txt,.lig-medium-txt,.lig-high-txt{
  font-weight:700
}



</style>
