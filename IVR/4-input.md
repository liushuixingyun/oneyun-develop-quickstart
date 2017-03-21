# 接收按键码输入

## 接收DTMF按键码动作
IVR收码动作

如给用户播放一个`欢迎音乐.wav` 和 `请输入选择音乐.wav` 的音乐，并且进行收码。IVR收码动作的XML如下：

```xml
<response>
    <get valid_keys="0123456789" finish_keys="#"><!-- 接收0123456789 按#键结束收码-->
      <playlist>
        <play>欢迎音乐.wav</play>
        <play>请输入选择音乐.wav</play>
      </playlist>
    </get>
    <next>http://yourhost/nextstep</next>
</response>
```

## 例子

简单运用收码的例子：用户呼叫IVR号码，先播放`欢迎音乐.wav`和`请输入选择音乐.wav` 并进行收码，收码结束后，用户按键是`1`的时候，播放`优惠音乐.wav`；用户按键是`0`则结束。

下面是例子的 Java 代码：

```java
@Controller
@RequestMapping("/rest/test/ivr")
public class RestTestCallCenterController {
    private static Logger logger =  LoggerFactory.getLogger(RestTestCallCenterController.class);
  //定义放音动作的XML（播放：优惠音乐)  
  private static final String specialOfferAction = "<response>\n" +
            "    <play finish_keys=\"#\">\n" +
            "      优惠音乐.wav\n" +
            "    </play>\n" +
            "    <next>http://xxx/rest/test/ivr/end</next>\n" +
            "</response>";
  //定义收码动作的XML(先播放欢迎引导音)
  private static final String getNumAction = "<response>\n" +
            "    <get valid_keys=\"0123456789\" finish_keys=\"#\">\n" +
            "      <playlist>\n" +
            "        <play>欢迎音乐.wav</play>\n" +
            "        <play>请输入选择音乐.wav</play>\n" +
            "      </playlist>\n" +
            "    </get>\n" +
            "    <next>http://xxx/rest/test/ivr/play</next>\n" +
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
  	@RequestMapping(value="/play" ,method = RequestMethod.GET)
    @ResponseBody
    public String play(HttpServletRequest req, HttpServletResponse res,String keys) {
        //根据按键内容返回不同动作
      if("1".equals(keys)){//查询最新优惠
        return specialOfferAction;
      }else if("0".equals(keys)){//返回结束
        return endAction;
      }
        return "";
    }
    @RequestMapping(value="/end" ,method = RequestMethod.GET)
    @ResponseBody
    public String end(HttpServletRequest req, HttpServletResponse res) {
        //播放完成，平台重新询问时，返回结束动作
        return endAction;
    }
}
```
