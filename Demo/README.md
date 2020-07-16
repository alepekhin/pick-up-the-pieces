# Demo backend and frontend

## Постановка задачи

У нас есть устройства (devices) которые могут быть расположены в разных местах (locations)

База данных имеет два простых справочника -

- locations (location varchar(200)) primary key
- devices (device varchar(200)) primary key

и таблицу associations c полями

- location - foreign key to locations.location
- device - foreign key to devices.device

Пользователь может имет роли admin, guest
в соответствии с которыми может писать в базу или только читать

Сделать приложение, которое этим управляет





