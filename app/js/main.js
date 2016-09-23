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