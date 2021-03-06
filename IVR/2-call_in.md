# 响应电话呼入

<!-- toc -->

----

## 呼入的回调处理
IVR流程交互：

用户呼叫IVR号码时，平台会向应用服务器发起请求，询问第一步做什么动作，应用服务器返回第一步动作。如果应用服务器没有返回有效动作，则平台会视为挂断。此时请求的地址是应用中配置的回调地址。

平台向应用服务器发起请求的是POST请求，并在body中带json格式的业务参数。格式如下：

```json
{
  "action":"ivr_start",
  "type":"ivr_incoming",//ivr类型，ivr_call代表是平台呼给用户，ivr_incoming表示用户呼入
  "call_id":"xxxxxxxxxxxxxx",//呼叫id
  "subaccount_id":"xxxxxxxxxxxx",//子账号id，事件所属子账号，如果为空表示是主账号的事件
  "from":"用户号码",
  "user_data":"用户数据"
}
```

应用服务器对IVR呼入请求的处理器（称为第一步处理器），应做处理，如不做有效处理，则用户呼入被挂断。其 Java 代码片段如下：

```java
    @RequestMapping(value="/CallbackURL" ,method = RequestMethod.POST,consumes = "application/json;charset=utf-8",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String callback(HttpServletRequest req, HttpServletResponse res, @RequestBody Map<String, Object> data){
        if (data.get("action") != null && org.apache.commons.lang.StringUtils.isNotEmpty(data.get("action").toString()) && "ivr_start".equals(data.get("action").toString())&&
        org.apache.commons.lang.StringUtils.isNotEmpty(data.get("type").toString()) && "ivr_incoming".equals(data.get("type").toString())) {
          //检验是IVR呼入事件(ivr_start)且是用户呼入（type==ivr_incoming）,返回操作的第一步处理
          return first_action_xml;//first_action_xml表示第一个IVR动作
        }
        return "";
    }
```

IVR XML 如下：

```xml
<response>
    <play finish_keys="#"><!-- 当天动作是放音play-->
      welcome.wav
    </play>
    <next>next-callback-url</next><!-- 称为IVR下一步：当前动作处理结束，平台请求的新的地址，用来询问下一步执行什么动作；如果没有这个地址，则在该动作处理完之后，平台结束IVR流程 -->
</response>
```

当应用服务器在`第一步处理器`中返回了一个有有效的IVR动作。且IVR动作中包含 `IVR下一步`，则平台会继续向应用服务器发起请求询问一步操作。此时请求的地址是`IVR下一步`中自定义的地址。

应用服务器对请求IVR下一步的处理器（称为IVR下一步处理器），其 Java 代码片段如下：

```java
	//第二步开始的回调地址
    @RequestMapping(value="next-callback-url" ,method = RequestMethod.GET,consumes = "application/json;charset=utf-8",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String handle(HttpServletRequest req, HttpServletResponse res,@RequestParam String type,@RequestParam String error)  {
      //type 上个动作的标签名称 error上个动作执行错误的信息
      //建议在url中带上标志参数，根据标志处理业务并返回需要的下一步动作
        return "next ivr action";
    }
```

平台在每个动作执行完成都会将执行结果向`IVR下一步`发起请求，并询问下一步执行什么动作。

直到某个动作没有`IVR下一步`，或`IVR下一步处理器`返回结束动作或返回空字符串。IVR流程到此结束。
