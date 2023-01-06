/***********REGESTRING**************/

function formREGISTER(MAIL){
TZ("#u_email").val(MAIL);
TZ("#u_email_confirm").val(MAIL);
TZ("#u_password").val(pass);
TZ("#u_password_confirm").val(pass);
setTimeout(function(){ TZ("#create_user").click()},500);
document.getElementById("create_user").addEventListener("click", function(){checkbox()});

}

/***********GEBERATE-EMAIL**************/

function getMAIL(){
      if(typeof localStorage["mail"] === "undefined"){
           localStorage.mail = tzliste[0]
      }else{
var index = parseInt(tzliste.indexOf(localStorage.mail))+1;
          localStorage.mail = tzliste[index];
      }
   setTimeout(function(){formREGISTER(localStorage.mail)},500);

}

/***********CHECKING-EMAIL**************/

document.querySelector("body > table:nth-child(16) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr > td:nth-child(2) > form > table.th > tbody > tr:nth-child(1) > td:nth-child(3) > a > span > b")
var fgf,saga;
function checkMAIL(){
GM_xmlhttpRequest({method: "GET",url: "https://mail.google.com/mail/u/0/h/",
    onload: function(response) {
        saga = TZ(response.responseText).find('input[name="at"]').val();console.log(saga)
        var tds = TZ(response.responseText).find("td > a").each(function() {
        var msg = TZ(this).html();
        var msg1 = TZ(this).attr('href');
        if(msg.includes("Confirmation de votre enregistrement")){
            var cc = "https://mail.google.com/mail/u/0/h/gzmur0sgjput/";
            var otpmailbk = cc+msg1;
            fgf = msg1.split('th=')[1].split('&')[0];
            console.log(otpmailbk)
            mailotpbook2(otpmailbk)
        }
    })}

         })
}
/***********READING-EMAIL**************/
      function mailotpbook2(az){
    GM_xmlhttpRequest({method: "GET",url: az,
    onload: function(response) {
    var user = response.responseText
    var tds = TZ(response.responseText).find("strong > a").each(function() {
        var df= TZ(this).attr('data-saferedirecturl');
        if (df && df.includes("fr.tlscontact")){
            var tes = df.split("url?q%3D")[1]
            var te = decodeURIComponent(tes);
            var ur = decodeURIComponent(te.split("&sa")[0])
            console.log(ur)
            confirmregister(ur);
        }
    })
        }
         })
    }


/***********CHECKINGTLS**************/

//---------------------------------------------localStorage["mail"]==undefined &&
function checktls(){

if (TZ("div.col-lg-6.mx-auto > p:nth-child(1) > span > strong").length){

if(TZ("div.col-lg-6.mx-auto > p:nth-child(1) > span > strong").text().include("Le code d’activation de votre compte")){
    checkMAIL(localStorage.mail)
}
}
else if(TZ("#message > div").text().include("Sorry, this email address is already taken")){

     window.location = "https://visa-fr.tlscontact.com/dz/orn/login.php"
}
else if(TZ("#u_email").length){
getMAIL();
}
}

/***********CHECKBOX-CONFIRM**************/

function checkbox(){
var tz01 = setInterval (function(){
if(TZ("#legal_information_yes").length){
    document.getElementById("legal_information_yes").click();
    document.getElementById("customer_survey_yes").click();
    document.getElementById("marketing_email_yes").click();
    document.getElementById("marketing_phone_yes").click();
    document.getElementById("marketing_sms_yes").click();
    document.getElementById("marketing_partners_yes").click();
    setTimeout(function(){document.getElementById("consent_button").click()},500);
    clearInterval(tz01);
}

},1500);
}
/***********************************************************************/


/***********CONFIRMING-URL-TLS**************/

function confirmregister(url){
GM_xmlhttpRequest({method: "GET",url: url,
    onload: function(response) {
        var user = response.responseText
        console.log(user);delmail();
       setTimeout(function(){window.location = "https://visa-fr.tlscontact.com/dz/orn/login.php"},1000)
        }
    })

}
function delmail(){
    GM_xmlhttpRequest ( {
    method:"POST",
    url:"https://mail.google.com/mail/u/0/h/87k1s9tq4vfc/?&",
    data: "redir=%3F%26&at="+saga+"&tact=&t="+fgf+"&nvp_a_tr=Supprimer&bact=",
    headers:    {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function (data) {
      console.log(data.status);
    }
});

    }
function login()
{
document.querySelector("#form > div > div:nth-child(1) > div").remove();document.querySelector("body > header").remove();document.querySelector("#steps").remove();document.querySelector("body > footer").remove();
setTimeout(function(){
    if (TZ("#message > div").length && TZ("#message > div").text().includes("temporairement verrouillé")|| TZ("#message > div").text().includes("Please note that your account has not been activated ")||TZ("#message > div").text().includes("temporarily locked")) {
        window.location = "https://visa-fr.tlscontact.com/dz/orn/register.php"
    }else{
         document.getElementById("pwd").value= pass ;
        document.getElementById("email").value = localStorage.mail;
        setTimeout(function(){document.querySelector('input[value="S’identifier"]').click();},1000);
    }
    }, 1000);
}
function MYAPPFULL(){
const html = document.getElementsByTagName('html')[0].textContent;

/*********************************************************/

TZ('document').ready(() => {
    if ( html.includes("You have been temporarily blocked") ) { alert ("IP temporarily blocked") }
    /************************************ Myapp *******************************************************/
    else if (location.href.includes("/myapp.php?fg_id") && document.getElementById("ajax_form_status")) {
        var tt = document.getElementsByClassName("tt");
        if (tt[0].innerText.includes(`Remplir le(s) formulaire(s)`) && tt[0].parentElement.getAttribute("class") != "done hd" && tt[1].innerText != "Validation: en attente"){ setTimeout(function(){formtz()},2000)}

        else if (document.body.innerText.includes(`Validation: en attente`)) {
                
                let param = {
                    f_id:"",
                    fg_id: location.search.split("=")[1].split("&")[0],
                    what: "submit",
                    result: "",
                    as_u_id: "",
                    _sid: secret_id,
                    process: 'multiconfirm',
                    reloader_timestamp: Date.now()
                }
                setTimeout(function(){
                TZ.ajax({
                    type : 'POST',
                    url : 'https://'.concat(window.location.hostname,window.location.pathname.split("/",3).join("/"),'/action.php'),
                    data : param
                }).done( refresh )
                  .fail(refresh);
                },1500);
        }}
})
/****************************************************************************************************************///tesseract

function refresh(e){setTimeout(function(){location.href=location.href},1e3*e),counter(e,"refresh")};
function counter(e,n){let t=e<=10?1:e>180?60:e>50?10:5,l=setInterval(function(){e>t?(e-=t):clearInterval(l)},t*1000)}


 
function formtz(){
    var passport = "5" + Math.floor(1000000 + Math.random() * 99999999);
    var num = "2137" + Math.floor(1000000 + Math.random() * 99999999);
var formData = {
  "_sid": secret_id,
  "as_u_id": "",
  "f_app_form_template": "application_form_template_cs",
  "f_france_visas_reference": "",
  "f_id": "NEW",
  "f_pass_num": passport,
  "f_pers_birth_date": "1990-02-02",
  "f_pers_givennames": "aaa",
  "f_pers_mobile_phone": num,
  "f_pers_nationality": "dz",
  "f_pers_province": "ORAN",
  "f_pers_surnames": "aaaa",
  "f_trav_go_to_domtom": "f",
  "f_xref_fg_id": location.search.split("=")[1].split("&")[0],
  "fi_fingerprints_collected": "f",
  "fi_first_schengen_trip": "f",
  "fi_passback_service": "f",
  "fi_trav_origin_departure_date": "2022-10-25",
  "process": "save_form",
  "visa_purpose[trav_purpose]": "cs_visite_privee",
  "visa_purpose[visa_type]": "short_stay"
};
          TZ.ajax({ type : 'POST',
                    url : 'https://'.concat(window.location.hostname,window.location.pathname.split("/",3).join("/"),'/ajax/save_application.php'),
                    data : formData
                    }).done( refresh )
                      .fail(refresh);

};

}
