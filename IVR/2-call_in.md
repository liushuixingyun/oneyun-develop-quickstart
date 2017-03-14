# 处理电话呼入

<!-- toc -->

----

{% method -%}
## 电话呼入事件回掉
Web Callback bla bla ...

{% sample lang="node" -%}
```sh
$ npm install oneyun-server-sdk
```

{% sample lang="php" -%}
```sh
$ composer install oneyun/sdk
```

{% endmethod %}

{% method -%}
## 接听
bla bla ...

{% sample lang="node" -%}
```js
var oneyun = require('oneyun');
var express = require('express');
var app = express();

app.get('/ivr', function (req, res) {
  let ivr = new oneyun.Ivr();
  ivr.answer();
});
```

{% sample lang="php" -%}
```php
<?php
require __DIR__."/vendor/autoload.php";

header("Content-type:text/xml");

$ivr_resp = new Oneyun\Ivr();
$ivr_resp->answer();

echo $ivr_resp;
```
{% common %}
bla bla ...

{% endmethod %}

{% method -%}
## 放音
bla bla ...

{% sample lang="node" -%}
```js
var oneyun = require('oneyun');
var express = require('express');
var app = express();

app.get('/ivr', function (req, res) {
  let ivrResp = new oneyun.Ivr();
  ivrResp.play("welcome.wav");
  res.set('Content-Type', 'text/xml');
  res.send(ivrResp.toXml());
});
```

{% sample lang="php" -%}
```php
<?php
require __DIR__."/vendor/autoload.php";

header("Content-type:text/xml");

$ivr_resp = new Oneyun\Ivr();
$ivr_resp->play("welcome.wav");

echo $ivr_resp;
```

{% endmethod %}

------
