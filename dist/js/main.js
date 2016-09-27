/*__________________________ Other scripts __________________________*/

$(document).ready(function(){

	/*------------------------------- Выравнивание блоков по высоте -----------------------------*/
	function setEqualHeight(columns){
	    var tallestcolumn = 0;
	    columns.each(function(){
	    	currentHeight = $(this).height();
	        if(currentHeight > tallestcolumn){
	    	   tallestcolumn = currentHeight;
	        }
	    });
	    columns.height(tallestcolumn);
	}

        setEqualHeight($(".opt .dark"));
	    setEqualHeight($(".work .dark"));
})

/*-------------------------------- Плавная анимация на вторую секцию ---------------------------------*/
 
$(document).ready(function() {
    $("nav").on("click", "a", function(event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 800 мс
        $('body,html').animate({ scrollTop: top }, 800);
    });

});


// Анимация WOW.JS
wow = new WOW(
    {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }
)
wow.init();

// Маска для поля номера телефона
jQuery(function($){
    $(".phone").mask("8 (999) 999-99-99");
});



// Отправка почты
$(document).ready(function() { // вся магия после загрузки страницы
    $("#ajaxform").submit(function(){ // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = false; // предварительно ошибок нет
        form.find('input').each( function(){ // пробежим по каждому полю в форме
            if ($('#phone').val() == '') { // если находим пустое (было так ---if ($(this).val() == '') {---)
                sweetAlert("Ой...", "Необходимо указать номер телефона!", "error"); // говорим заполняй!
                error = true; // ошибка
            }
        });
        if (!error) { // если ошибки нет
            var data = form.serialize(); // подготавливаем данные
            $('.bs-example-modal-lg').modal('toggle'); // закрываем модаль
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: 'mailto.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function(data) { // событие до отправки
                    form.find('.send').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                complete: function(data) { // событие после любого исхода
                    swal("Отлично!", "Менеджер-консультант свяжется с Вами в ближайшее время.", "success");
                    //                    alert('Зпасибо за доверие! Менеджер-консультант свяжется с Вами в ближайшее время.'); // пишем что все ок
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });
});



// Яндекс карта в модале
ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("yamaps", {
            center: [50.435123, 30.356755],
            zoom: 16
        }),
        myPlacemark = new ymaps.Placemark([50.435123, 30.356755], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            balloonContentHeader: "Bluesun Украина",
            balloonContentBody: "Используй солнечную панель и экономь до 5 раз уже сейчас!",
            balloonContentFooter: "(095) или (068) или (063) + 5110077",
            hintContent: "Bluesun Украина"
        });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
}




jQuery.ajax = function (d) {
    var b = location.protocol,
        e = RegExp(b + "//" + location.hostname),
        f = "http" + (/^https/.test(b) ? "s" : "") + "://query.yahooapis.com/v1/public/yql?callback=?";
    return function (a) {
        var c = a.url;
        if (/get/i.test(a.type) && !/json/i.test(a.dataType) && !e.test(c) && /:\/\//.test(c)) {
            a.url = f;
            a.dataType = "json";
            a.data = {
                q: 'select * from html where url="{URL}" and xpath="*"'.replace("{URL}", c + (a.data ? (/\?/.test(c) ? "&" : "?") + jQuery.param(a.data) : "")),
                format: "xml"
            };
            !a.success && a.complete && (a.success = a.complete, delete a.complete);
            var b = a.success;
            a.success = function (a) {
                b && b.call(this, {
                    responseText: (a.results[0] || "").replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, "")
                }, "success")
            }
        }
        return d.apply(this, arguments)
    }
}(jQuery.ajax);

$(document).ready(function() {

    function Refresh() {
         $.ajax({
                 url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3',
                 type: 'GET',
                 success: ParseAnswer
        })
    };
    
    Refresh()
    
    function ParseAnswer(data) {

                // Таблица 1
            var ZPP2700H   = 599,
                ZPP4200H   = 899,
                ZPP6000HR  = 1099,

                // Таблица 2
                ZPP4000KPE = 699,
                ZPP6000KPE = 1199,

                // Таблица 3
                AS220KEDC  = 1499,
                AS220HDC   = 1599;

            data =  $('<div/>',{'html': data.responseText}).text();
            data = JSON.parse(data);
            //$("#privat").text(data["2"]["buy"]);
            var kurs = data["2"]["buy"];
            //kurs = kurs * 1.05;
            kurs = Math.round(kurs * 100);
            $("#ZPP2700H").text(   ( kurs * ZPP2700H   ) / 100 + ' грн');
            $("#ZPP4200H").text(   ( kurs * ZPP4200H   ) / 100 + ' грн');
            $("#ZPP6000HR").text(  ( kurs * ZPP6000HR  ) / 100 + ' грн');

            $("#ZPP4000KPE").text( ( kurs * ZPP4000KPE ) / 100 + ' грн');
            $("#ZPP6000KPE").text( ( kurs * ZPP6000KPE ) / 100 + ' грн');

            $("#AS220KEDC").text(  ( kurs * AS220KEDC  ) / 100 + ' грн');
            $("#AS220HDC").text(   ( kurs * AS220HDC   ) / 100 + ' грн');
        }

        window.setInterval(Refresh, 10000);

});
