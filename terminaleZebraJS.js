(function () {
  const cssRules = `
    /*TRANSFER, SPLIT and ACTION Buttons*/
.human .btn-transfer,
.human .btn-split,
.hufast .btn-split,
.hufast .btn-action{
  width: 75px !important;
  height: 75px !important;
  padding: 0 !important;
}


.human .btn-transfer .sapMBtnInner,
.human .btn-split .sapMBtnInner,
.hufast .btn-split .sapMBtnInner,
.hufast .btn-action .sapMBtnInner,
.human .btn-transfer .sapMBtnContent,
.human .btn-split .sapMBtnContent,
.hufast .btn-split .sapMBtnInner,
.hufast .btn-action .sapMBtnContent{
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}

.human .btn-transfer bdi,
.human .btn-split bdi,
.hufast .btn-split bdi,
.hufast .btn-action bdi{
  font-size: 0.7rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/*First HU red*/
[id*="application-ZFEWM_HU_APP_N-display-component---list--list-0"] {
  background-color: red;
  color: white;
}

/*Close button*/
#application-ZEWM01-display-component---detail--closeColumn-button-img {
  transform: scale(2);
}

#application-ZEWM01-display-component---detail--detailPage-pageTitle-_actionsToolbar {
  display: none;
}

#application-ZFEWM_HU_APP_N-display-component---detail--closeColumn-button-img{
  transform: scale(2);
}

#application-ZFEWM_HU_APP_N-display-component---detail--detailPage-pageTitle-_actionsToolbar {
  display: none;
}

/*Buttons on the right*/
#application-ZEWM01-display-content .sapFDynamicPageHeaderContent,
#application-ZFEWM_HU_APP_N-display-content .sapFDynamicPageHeaderContent{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

/*Transfer popup*/
#ProcType {
  display : none!important;
}

label[for="ProcType-inner"] {
  display: none !important;
}

#DestBIN{
	height: 75px;
}
#DestBIN-content{
	height: 75px;
}
#DestBIN-inner{
	height: 75px;
	font-size: 1.5rem;
}

label[for="DestBIN-inner"] {
  font-size: 1.5rem;
}

#DestHU{
	height: 75px;
}
#DestHU-content{
	height: 75px;
}
#DestHU-inner{
	height: 75px;
	font-size: 1.5rem;
}

label[for="DestHU-inner"] {
  font-size: 1.5rem;
}

#DestHU-inner:focus,
#DestBIN-inner:focus {
  background-color: #f0f8ff !important;
  border: 2px solid #4287f5 !important;
  box-shadow: 0 0 15px #4287f5 !important;
}

/*MANAGE PRODUCTION CONFIRMATION update*/
#webguiPage0{
	position: fixed!important;
	width: 100%!important;
}
#msgpanel{
	height: 60px!important;
}

*[id="M0:46"] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

*[id="M0:46:::1:6"]{
	width: 50%!important;
	height: 50px;
}

*[id="M0:46:::1:6-cnt"]{
	width: 200px;
	height: 50px;
}

*[id="M0:46:::1:6-caption"]{
	font-size: 25px;
}

*[id="M0:46:::11:6"]{
	width: 50%!important;
	height: 50px;
}

*[id="M0:46:::11:6-cnt"]{
	width: 200px;
	height: 50px;
}

*[id="M0:46:::11:6-caption"]{
	font-size: 25px;
}

*[id="M0:46:::3:0-text"],
*[id="M0:46:::7:0-text"]{
	font-size: 30px;
}


*[id="M0:46:::7:0"],
*[id="M0:46:::3:0"]{
	justify-content: center!important;
}

*[id="M0:50::btn[0]-r"],
*[id="M0:50::btn[0]"],
*[id="M0:50::btn[0]-caption"]{
	height: 100%!important;
	width: 100px!important;
}

.lsRasterLayout--item-vAlign-middle
{
	position: relative!important;
  margin-top:0!important;
	margin-left: 0!important;
	width: 100%!important;
	height: 50px!important;
}

  `;
//Inject CSS file (separate file seems not working)
  function injectCSS() {
    const style = document.createElement('style');
    style.textContent = cssRules;
    document.head.appendChild(style);
  }

//App selection -> control class -> css easier to modify
  function classifyApp() {
    const HUMan = document.querySelector('#application-ZEWM01-display-content');
    const HUFast = document.querySelector('#application-ZFEWM_HU_APP_N-display-content');
    document.body.classList.remove('human', 'hufast');
    if (HUMan) document.body.classList.add('human');
    if (HUFast) document.body.classList.add('hufast');
  }

//Hiding post change button and adding a control class to transfer, split and action buttons
  function labelButtons() {
    document.querySelectorAll('bdi').forEach((bdi) => {
      const label = bdi.textContent.trim().toUpperCase();
      const button = bdi.closest('button');
      if (!button) return;
      if (label === 'POST CHANGE') button.style.display = 'none';
      if (label === 'TRANSFER') button.classList.add('btn-transfer');
      if (label === 'SPLIT') button.classList.add('btn-split');
      if (label === 'ACTION') button.classList.add('btn-action');
    });
  }

//set focus on DestHU field after 0.2s
  function focusDestHU() {
    setTimeout(() => {
      const destHU = document.querySelector('#DestHU-inner');
      if (destHU) destHU.focus();
    }, 200);
  }

//Creating a div with both destHU and destBIN
  function showDestinationValues(db, hu) {
    let existing = document.getElementById('destValues');
    if (existing) {
      existing.innerHTML = "DestBIN : " + db + "<br>DestHU : " + hu;
    } else {
      const div = document.createElement('div');
      div.id = 'destValues';
      div.innerHTML = "DestBIN : " + db + "<br>DestHU : " + hu;
      Object.assign(div.style, {
        backgroundColor: 'lightblue',
        padding: '10px',
        lineHeight: '2.5',
        border: '1px solid #ccc',
        fontSize: '16px',
        color: '#000',
        marginTop: '10px'
      });
      const container = document.querySelector('.sapFDynamicPageHeaderContent');
      if (container) container.appendChild(div);
    }
  }

  function attachSaveHandler() {
    const buttons = document.querySelectorAll('button');
    const saveBtn = Array.from(buttons).find(btn => btn.textContent.trim().toUpperCase() === 'SAVE');
    if (!saveBtn) return;
    saveBtn.addEventListener('click', () => {
      const dbVal = document.getElementById('DestBIN-inner')?.value || '';
      const huVal = document.getElementById('DestHU-inner')?.value || '';
      setTimeout(() => showDestinationValues(dbVal, huVal), 100);
    });
  }

  function runAll() {
    injectCSS();
    classifyApp();
    labelButtons();
    focusDestHU();
    attachSaveHandler();
  }

//run all the functions once DOM is completely loaded, when url change (app change) and when something change in the DOM
  document.addEventListener('DOMContentLoaded', runAll);
  window.addEventListener('hashchange', () => setTimeout(runAll, 300));

  const observer = new MutationObserver(() => {
    const HUReady = document.querySelector('#application-ZEWM01-display-content, #application-ZFEWM_HU_APP_N-display-content');
    if (HUReady) setTimeout(runAll, 200);
  });

  function waitForBody() {
    if (!document.body) return setTimeout(waitForBody, 50);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  waitForBody();
})();
