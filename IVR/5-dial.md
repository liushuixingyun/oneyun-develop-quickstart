# 外呼拨号

<!-- toc -->

----

## 拨号 IVR

IVR拨号动作是用于呼叫外线。这里的外线指的是固话或者手机号码。

如IVR中需要连接外线号码是188xxxxxxxx。IVR拨号动作的XML如下：

```xml
<response>
  <dial from="IVR呼出号码"><!-- IVR呼出号码，可以填，也可以不填。需要指定号码的话，需要先在平台购买IVR号码，并绑定到应用下。-->
    <number>188xxxxxxxx</number>
    <play>呼叫等待.wav</play><!-- 呼叫外线时，用户听到的等待音-->
    <connect/>
   </dial>
   <next>http://yourhost/nextstep</next>
</response>
```

## 实现代码

用户呼入IVR号码，先播放一段：“欢迎使用壹耘体验系统，请输入你想要呼出的外线，可以是手机号码或者固话，输入完成按#结束，退出通话请按 **`*`** 的音乐，然后接收按键码，并做处理。收码到进行呼外线，呼叫失败则返回呼出失败的音乐并结束通话。呼出成功，连通外线。呼外线结束后，结束通话。

下面是例子的 Java 代码片段：

```java
@Controller
@RequestMapping("/rest/test/ivr")
public class RestTestCallCenterController {
    private static Logger logger =  LoggerFactory.getLogger(RestTestCallCenterController.class);
  //定义呼外线动作（呼叫人工号码，连通用户和外线）
  private static final String callOutsideLineAction = "<response>\n" +
            "  <dial from=\"\">\n" +
            "    <number>{phone}</number>\n" +//其中{phone}是要呼的外线号码，用户输入后再替换
            "    <play>呼叫等待.wav</play>\n" +
            "    <connect/>\n" +
            "   </dial>\n" +
            "   <next>http://xxx/rest/test/ivr/callend</next>\n" +
            "</response>";
  //定义放音动作的XML（播放：呼叫失败音乐)  
  private static final String callFailAction = "<response>\n" +
            "    <play finish_keys=\"#\">\n" +
            "      呼叫失败音乐.wav\n" +
            "    </play>\n" +
            "    <next>http://xxx/rest/test/ivr/end</next>\n" +
            "</response>";
  //定义收码动作的XML(先播放欢迎引导音)
  private static final String getNumAction = "<response>\n" +
            "    <get valid_keys=\"0123456789*\" finish_keys=\"#\">\n" +
            "      <playlist>\n" +
            "        <play>欢迎音乐.wav</play>\n" +
            "        <play>请输入外线号码.wav</play>\n" +
            "      </playlist>\n" +
            "    </get>\n" +
            "    <next>http://xxx/rest/test/ivr/handle</next>\n" +
            "</response>";
  //定义结束动作的XML
    private static final String endAction = "<response>\n" +
            "    <hangup></hangup>\n" +
            "</response>";

    @RequestMapping(value="/callback" ,method = RequestMethod.POST,consumes = "application/json;charset=utf-8",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String callback(HttpServletRequest req, HttpServletResponse res, @RequestBody Map<String, Object> data) {
       if (data.get("action") != null && org.apache.commons.lang.StringUtils.isNotEmpty(data.get("action").toString()) && "ivr_start".equals(data.get("action").toString())&&
        org.apache.commons.lang.StringUtils.isNotEmpty(data.get("type").toString()) && "ivr_incoming".equals(data.get("type").toString())) {
          //检验是IVR呼入事件(ivr_start)且是用户呼入（type==ivr_incoming）,返回操作的第一步处理
          return getNumAction;//返回上面定义的放音动作
        }
        return "";
    }
  	@RequestMapping(value="/handle" ,method = RequestMethod.GET)
    @ResponseBody
    public String handle(HttpServletRequest req, HttpServletResponse res,String keys) {  
      //根据按键内容返回不同动作
      if("*".equals(keys)){//返回结束
         return endAction;
      }else {//进行外呼，可以在此处验证输入的是否是固话或手机号码，例子没做验证
        String newCallOutsideLineAciton = callOutsideLineAction.replace("{phone}",keys);
        return newCallOutsideLineAciton;
      }
      return "";
    }
  	@RequestMapping(value="/callend" ,method = RequestMethod.GET)
    @ResponseBody
    public String end(HttpServletRequest req, HttpServletResponse res, @RequestParam(required = false) error) {
      if(error!=null && error.length()>0 ){//error 存在且error有值，表示呼叫失败,播放呼叫失败音乐
        return callFailAction;
      }else{//呼叫成功，外线结束，断开通话
        return endAction;
      }
    }
    @RequestMapping(value="/end" ,method = RequestMethod.GET)
    @ResponseBody
    public String end(HttpServletRequest req, HttpServletResponse res) {
        //播放完成和呼叫外线完成，平台重新询问时，返回结束动作
        return endAction;
    }
}
```

------

到此为止，我们已经学习了最基本的 IVR 功能，包括呼入、呼出、放音、收 DTMF 码、通道连接。
下面的课程更精彩，敬请期待 😉
