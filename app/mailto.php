<?
if(isset($_POST['phone'])){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'mail@test1.organica.pp.ua,alkv84@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов info@shparma.kiev.ua
        $subject = 'Обратный звонок с сайта BLUESUN'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>Сообщение с с сайта BLUESUN!</title>
                    </head>
                    <body>
                        <p><strong>Имя отправителя:</strong> '. $_POST['name'] .'</p>
                        <p><strong>E-mail отправителя:</strong> '. $_POST['email'] .'</p>
                        <p><strong>Телефон отправителя:</strong> '. $_POST['phone'] .'</p>
                        <div style="background: #eee; border: 1px solid #888; padding:15px;"><p><strong>Сообщение:</strong></p><p> '. $_POST['message'] . '</p></div>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: BLUESUN\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}