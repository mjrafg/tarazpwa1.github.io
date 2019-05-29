var baseURL = 'https://cors-anywhere.herokuapp.com/' + "http://109.162.199.82:4040/paladium/";
var userNameSTR = "userName", passSTR = "password", PersonalCodeSTR = "personalCode", PersonalInformationSTR = "PersonalInformation";
var homePage = { name: "#divhome", title: "نرم افزار کلوپ ورزشی پالادیوم" };
var loginPage = { name: "#divlogin", title: "نرم افزار کلوپ ورزشی پالادیوم" };
var financePage = { name: "#divfinance", title: "اطلاعات مالی" };
var RegistartionPage = { name: "#divregistration", title: "اطلاعات ثبت نام" };
var RegistartionDetailPage = { name: "#divregistrationdetail", title: "جزییات اطلاعات ثبت نام" };
var RegistartionActivePage = { name: "#divregistrationinformation", title: "اطلاعات ثبت نام فعال" };
var RegistartionDeactivePage = { name: "#divregistrationinformation", title: "اطلاعات ثبت نام غیرفعال" };
var PersonalInformationPage = { name: "#personalinformation", title: "اطلاعات فردی" };
var newsPage = { name: "#divNews", title: "اخبار باشگاه" };
var galleryPage = { name: "#divGallery", title: "گالری تصاویر" };
var reportsPage = { name: "#divreports", title: "گزارش ها" };
var contactusPage = { name: "#divcontactus", title: "ارتباط با ما" };
var trafficPage = { name: "#divtrafficreport", title: "گزارش تردد ها" };
var dailyreportPage = { name: "#divdailyreport", title: "گزارش روزانه" };
var galleryButtonType = { next: 1, prev: 2 };
var animationType = { left: 1, right: 2 };
var galleryInfo = { action: 1, nextId: 1 }
var galleryButtonPressed = galleryButtonType.next;
var startpage = loginPage;
var registrationType = { active: 1, deactive: 2 };
var pageStack = [];
var canClick = true;
$(document).ready(function () {

    $("#login").on("click", function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == '') {
            makeToast('وارد کردن نام کاربری الزامی می باشد');
            return;
        }
        if (password == '') {
            makeToast('وارد کردن رمز عبور الزامی می باشد');
            return;
        }
        login(username, password);
    });
    $("#instagram").on("click", function () {
        openInstagram();
    });
    $("#btncontactus").on("click", function () {
        openInstagram();
    });
    $(".center-screen").each(function (i, elem) {
        $(elem).css("top", "50px");
    });
    $("#financeItem").on("click", function () {
        goToFinancePage();
    });
    $("#registrationItem").on("click", function () {
        goToRegistrationPage();
    });
    $("#back").on("click", function () {
        onBackPressed();
    });
    $("#registrationActive").on("click", function () {
        goToRegistrationInformationPage(registrationType.active);
    });
    $("#registrationDeactive").on("click", function () {
        goToRegistrationInformationPage(registrationType.deactive);
    });
    $("#personalInformationItem").on("click", function () {
        goToPersonalInformationPage();
    });
    $("#newsItem").on("click", function () {
        goToNewsPage();
    });
    $("#galleryItem").on("click", function () {

        goToGalleryPage();
    });
    $("#trafficReport").on("click", function () {
        goToTrafficReportPage();
    });
    $("#dailyReport").on("click", function () {
        goToDailyReportPage();
    });
    $("#showtrafficreport").on("click", function () {
        if (canClick) {
            var date = $("#intrafficreport").val();
            getTrafficReport(date);
        }
    });
    $("#showdailyreport").on("click", function () {
        if (canClick) {
            var date = $("#indailyreport").val();
            getDailyReport(date);
        }
    });
    $("#reportsItem").on("click", function () {
        var personalInformation = getPersonalInformation();
        if (personalInformation.St_Virtual) {
            goToReportsPage();
        }
        else {
            goToContactPage();

        }
    });
    $("#leftArrow").on("click", function () {

        if (canClick) {
            if (galleryInfo.action > 1) {
                galleryInfo.action--;
                galleryInfo.nextId--;
                $("#rightArrow").css("display", "block");
                GetGallery();
            }
        }

    });
    $("#rightArrow").on("click", function () {
        if (canClick) {
            galleryInfo.action++;
            galleryInfo.nextId++;
            $("#leftArrow").css("display", "block");
            GetGallery();
        }
    });
});
function openInstagram() {
    var win = window.open('http://instagram.com/palladium_fitness_club/', '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
}
function makeToast(message, title, type) {
    var settings = {
        heading: 'خطا',
        text: message,
        position: 'mid-center',
        stack: true,
        showHideTransition: 'slide',
        textAlign: 'right',
        hideAfter: false,
        textColor: '#000'
    };

    if (type != undefined) {
        settings.icon = type;
    }
    else {
        settings.bgColor = '#ffdd15';
    }
    $.toast(settings);
}
function setButtonState(state, button) {
    if (state) {
        $("#loading").css("display", "none");
        $(button).removeAttr('disabled');
    }
    else {
        $("#loading").css("display", "block");
        $(button).attr('disabled', 'disabled');
    }
}
function setLoadingState(state) {
    if (state) {
        $("#loading").css("display", "none");
    }
    else {
        $("#loading").css("display", "block");
    }
}
function setBackState(state) {
    if (state) {
        $("#back").css("display", "block");
    }
    else {
        $("#back").css("display", "none");
    }
}
function login(username, password) {

    var url = baseURL + "login";
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { Code: username, pass: password },
        beforeSend: function (xhr) {
            setButtonState(false, $("#login"));
        },
        success: function (data) {
            try {
                //if ($("#rememerme").is(":checked")) {
                //    makeToast("ok f r", "ok");
                //    setCookie("userName", username, 100);
                //    setCookie("password", password, 100);
                //    makeToast("ok l r", "ok");

                //}
                //else {
                //    eraseCookie("userName");
                //    eraseCookie("password");
                //}
                makeToast("ok f o", "ok");

                setCookieObject(PersonalInformationSTR, data, 100);
                makeToast("ok l o", "ok");

                goToHomePage();
                makeToast("ok", "ok");

            }
            catch (ee) {
                makeToast("خطا", "خطا");
            }
            
        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setButtonState(true, $("#login"));
        }
    });
}
function getToken() {
    return "token";
}
function pushPageStack(page) {
    pageStack.push(page);
}
function popPageStack(page) {
    return pageStack.pop();
}
function goToHomePage() {
    checkUserType();
    showPage(homePage, true, animationType.right);
}
function checkUserType() {
    var personalInformation = getPersonalInformation();
    if (!personalInformation.St_Virtual) {
        $("#reportsItemIMG").attr("src", "Images/ic-call.png");
        $("#reportsItemP").html("تماس با ما");
    }
}
function showPage(page, animation, outAnimationType) {
    pushPageStack(page);
    if (pageStack.length > 2) {
        setBackState(true);
    }
    else {
        setBackState(false);
    }
    var left = outAnimationType == animationType.left ? '-100%' : '100%';
    if (animation) {
        $(".content").animate({
            left: left
        }, 500, function () {
            showPageContent(page, outAnimationType);
        });
    }
    else {
        showPageContent(page);
    }

}
function onBackPressed() {
    setLoadingState(true);
    pageStack.pop();
    var page = pageStack.pop();
    showPage(page, true, animationType.left);
}
function showPageContent(page, outAnimationType) {
    var left = '-100%';
    if (outAnimationType)
        left = outAnimationType == animationType.left ? '100%' : '-100%';
    $("#toptitle").html(page.title);
    $('.content').css("left", left);
    $('.hide').map(function (index, element) {
        $(element).css("display", "none")
    });

    var div = $(page.name);
    $(".content").append(div);
    $(page.name).css('display', 'block');
    $(".content").animate({
        left: '0'
    }, 500);
}
function goToRegistrationPage() {
    showPage(RegistartionPage, true);
}
function goToFinancePage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        var remainCost = personalInformation.LName;
        $("#remainCost").html(remainCost);
        GetPersonelAccountInfo(personalCode);
        showPage(financePage, true);
    }
}
function goToRegistrationInformationPage(RegistrationType) {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        GetRegistrationInformationInfo(personalCode, RegistrationType);
        var page = RegistrationType == registrationType.active ? RegistartionActivePage : RegistartionDeactivePage;
        showPage(page, true);
    }
}
function goToTrafficReportPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        //GetRegistrationInformationInfo(personalCode, RegistrationType);
        var page = trafficPage;
        showPage(page, true);
    }
}
function goToDailyReportPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        //GetRegistrationInformationInfo(personalCode, RegistrationType);
        var page = dailyreportPage;
        showPage(page, true);
    }
}
function goToRegistrationDetailPage(PackID) {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        GetRegistrationDetailInfo(PackID);
        var page = RegistartionDetailPage;
        showPage(page, true);
    }
}
function goToPersonalInformationPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        GetPersonalInfo(personalInformation);
        var page = PersonalInformationPage;
        showPage(page, true);
    }
}
function goToNewsPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        GetNewsInfo(personalCode);
        var page = newsPage;
        showPage(page, true);
    }
}
function goToGalleryPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        GetGallery();
        var page = galleryPage;
        showPage(page, true);
    }
}
function goToContactPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        var page = contactusPage;
        showPage(page, true);
    }
}
function goToReportsPage() {
    var personalInformation = getPersonalInformation();
    var personalCode = personalInformation.Code;
    if (personalCode != undefined && personalCode != '') {
        var page = reportsPage;
        showPage(page, true);
    }
}
function GetNewsInfo(personalCode) {
    var contentItem = $("#newsContent").find(".content-item").first();
    var content = $("#newsContent");
    $(content).empty();
    var route = "SelectNews";
    var url = baseURL + route;
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: personalCode, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                for (var key in data) {
                    var value = data[key];
                    contentItem.find(".newsHeader").html(value.NewsHeader);
                    contentItem.find(".newsDetail").html(value.NewsDetail);
                    $("#newsContent").append(contentItem.clone());
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
        }
    });
}
function GetPersonalInfo(personalInformation) {
    $("#personalInformationCode").html(personalInformation.Code);
    $("#personalInformationNameFamily").html(personalInformation.NameFamily);
    $("#personalInformationBirthDay").html(personalInformation.BirthDay);
    $("#personalInformationRegDay").html(personalInformation.RegDay);
    $("#personalInformationMobile").html(personalInformation.Mobile);
    $("#personalInformationFName").html(personalInformation.FName);
    var contentItem = $("#personalSubContent").find(".content-item").first();
    var content = $("#personalSubContent");
    $(content).empty();
    var route = "PersonelSubAccountInfo";
    var personalCode = personalInformation.Code;
    var url = baseURL + route;
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: personalCode, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                for (var key in data) {
                    var value = data[key];
                    contentItem.find(".personalSubName").html(value.NAME);
                    $("#personalSubContent").append(contentItem.clone());
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
        }
    });
}
function GetRegistrationDetailInfo(personalCode) {
    var route = "PakageDetailInfo";
    var url = baseURL + route;
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: personalCode, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                var value = data[0];
                $("#registrationDetailMainGroupName").html(value.MainGroupName);
                $("#registrationDetailPackName").html(value.PackName);
                $("#registrationDetailRegDate").html(value.RegDate);
                $("#registrationDetailStartClassDate").html(value.StartClassDate);
                $("#registrationDetailExpireClassDate").html(value.ExpireClassDate);
                $("#registrationDetailNetPrice").html(value.NetPrice);
                $("#registrationDetailDiscount").html(value.Discount);
                $("#registrationDetailPayPrice").html(value.PayPrice);
                $("#registrationDetailSessionMainCount").html(value.SessionMainCount);
                $("#registrationDetailSessionUsed").html(value.SessionUsed);
                $("#registrationDetailSessionRemain").html(value.SessionRemain);

            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
        }
    });
}
function GetRegistrationInformationInfo(personalCode, RegistrationType) {
    var contentItem = $("#registrationinformationcontent").find(".content-item").first();
    var content = $("#registrationinformationcontent");
    $(content).empty();
    var route = RegistrationType == registrationType.active ? "ActivePakage" : "DeActivePakage";
    var url = baseURL + route;
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        datatype: "json",
        data: { PersonelCode: personalCode, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                for (var key in data) {
                    var value = data[key];
                    contentItem.find(".description").html(value.PackName);
                    contentItem.find(".startClassDate").html("شروع : " + value.StartClassDate);
                    contentItem.find(".expireClassDate").html("پایان : " + value.ExpireClassDate);
                    contentItem.find(".sessionMainCount").html("تعداد جلسه : " + value.SessionMainCount);
                    contentItem.find(".sessionUsed").html("استفاده شده : " + value.SessionUsed);
                    contentItem.find(".sessionRemain").html("مانده : " + value.SessionRemain);
                    contentItem.find(".registrationDetial").attr("onclick", "goToRegistrationDetailPage('" + value.PackID + "')");
                    $("#registrationinformationcontent").append(contentItem.clone());
                }
            } else {
                goToLoginPage();
            }
        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
        }
    });
}
function getPersonalInformation() {
    var mydata = JSON.parse(getCookie(PersonalInformationSTR));
    return mydata;
}
function getTrafficReport(date) {
    var trafficreportContetntItem = $("#trafficreportContetnt").find(".content-item").first();
    $(trafficreportContetntItem).css("display", "block");
    var trafficreportContetnt = $("#trafficreportContetnt");
    $(trafficreportContetnt).empty();
    var url = baseURL + "PersonelTotalLogInfo";
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: date, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
            canClick = false;
        },
        success: function (data) {
            if (data !== undefined) {
                for (var key in data) {
                    var value = data[key];
                    trafficreportContetntItem.find(".PersonelName").html(value.PersonelName);
                    trafficreportContetntItem.find(".SeccionCnt").html("میهمان : " + value.SeccionCnt);
                    trafficreportContetntItem.find(".InterTime").html("ساعت ورود : " + value.InterTime);
                    trafficreportContetntItem.find(".ExitTime").html("ساعت خروج : " + value.ExitTime);

                    $("#trafficreportContetnt").append(trafficreportContetntItem.clone());
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
            canClick = true;
        }
    });
}
function getDailyReport(date) {
    var url = baseURL + "PersonelTotalCash";
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: date, Condition: getToken() },
        beforeSend: function (xhr) {
            canClick = false;
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                var value = data[0];
                if (value != undefined) {
                    $("#dailyreportLb1").html(value.Lb1);
                    $("#dailyreportLb2").html(value.Lb2);
                    $("#dailyreportLb3").html(value.Lb3);
                    $("#dailyreportLb4").html(value.Lb4);
                    $("#dailyreportLb5").html(value.Lb5);
                    $("#dailyreportLb6").html(value.Lb6);
                    $("#dailyreportLb7").html(value.Lb7);
                    $("#dailyreportLb8").html(value.Lb8);
                    $("#dailyreportLb9").html(value.Lb9);
                    $("#dailyreportLb10").html(value.Lb10);
                }
                else {
                    makeToast("در این تاریخ اطلاعاتی یافت نشد", "خطا")
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
            canClick = true;
        }
    });
}
function GetPersonelAccountInfo(personalCode) {
    var financeContentItem = $(".financecontentitem").first();
    var financeContent = $("#financecontent");
    $(financeContent).empty();
    var url = baseURL + "PersonelAccountInfo";
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: { PersonelCode: personalCode, Condition: getToken() },
        beforeSend: function (xhr) {
            setLoadingState(false);
        },
        success: function (data) {
            if (data !== undefined) {
                for (var key in data) {
                    var value = data[key];
                    financeContentItem.find(".financeDescription").html(value.DESCRIPTION);
                    financeContentItem.find(".financeDocDate").html("تاریخ : " + value.DocDate);
                    var bedbes = "";
                    if (value.Bed == 0) {
                        bedbes = "افزایش اعتبار : " + value.Bes;
                    }
                    else {
                        bedbes = "کاهش اعتبار : " + value.Bed;
                    }
                    financeContentItem.find(".bedBes").html(bedbes);

                    $("#financecontent").append(financeContentItem.clone());
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
        }
    });
}
function setActionNextId() {
    if (galleryInfo.action == 1) {
        $("#leftArrow").css("display", "none");
    }
}
function GetGallery() {
    var url = baseURL + "GalleryInfo";
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: galleryInfo,
        beforeSend: function (xhr) {
            setLoadingState(false);
            canClick = false;
        },
        success: function (data) {
            if (data !== undefined) {
                var value = data[0];
                if (value == undefined || value.ImageData == undefined) {
                    makeToast("تصویر دیگری درون گالری وجود ندارد");
                    $("#rightArrow").css("display", "none");
                    galleryInfo.action--;
                    galleryInfo.nextId--;
                }
                else {
                    setActionNextId();
                    $("#divGallery").find(".gallery-img").first().attr("src", "data:image/png;base64," + value.ImageData);
                }
            } else {
                goToLoginPage();
            }

        },
        error: function (xhr, status, error) {
            makeToast('خطایی در ارتباط با سرور رخ داده است لطفا دوباره امتحان کنید', 'خطا', 'error')
        },
        complete: function () {
            setLoadingState(true);
            canClick = true;
        }
    });
}
function onload() {
    registerServiceWorker();
    var userName = getCookie("userName");
    var password = getCookie("password");
    $("#username").val(userName);
    $("#password").val(password);
    showPage(startpage);
}
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
}
window.addEventListener('load', onload);
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function setCookieObject(name, value, days) {
    var jsonValue = JSON.stringify(value);
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (jsonValue || "") + expires + "; path=/";
}

function eraseCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}