# 放音

## 上传放音文件
bla bla ...

{% method -%}
## IVR 放音
bla bla ...

{% sample lang="node" -%}
```js
var oneyun = require('oneyun');
var express = require('express');
var app = express();

app.get('/ivr/play', function (req, res) {
  let ivr = new oneyun.Ivr();
  ivr.play('your-file-name.wav');
  ivr.next('http://your-host/ivr/next');
});
```

{% sample lang="php" -%}
```php
<?php
require __DIR__."/vendor/autoload.php";

$ivr = new Oneyun\Ivr();
$ivr->play('your-file-name.wav');
$ivr->next('http://your-host/ivr/next');
echo $ivr;
```

{% common %}
bla bla ...

返回给 ONEYUNE 的 IVR 是一段 XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <play>your-file-name.wav</play>
  <next>http://your-host/ivr.php?step=next</next>
</response>
```

{% endmethod %}
