# 放音

## 准备

当你需要使用到`放音`动作时，你需要在我们的平台的用户控制台中，把对应的放音文件进行上传，并等待审核通过。之后在放音动作的xml中，使用放音文件名来指定放音文件。

## IVR 放音动作

IVR放音动作有两种，如下

一：播放单个声音文件

如给用户播放一个`欢迎引导音乐.wav`的放音文件， IVR放音动作的XML如下：

```xml
<response>
    <play finish_keys="#"><!-- 中断码,播放过程用户按#则结束-->
      欢迎引导音乐.wav
    </play>
    <next>http://yourhost/nextstep</next>
</response>
```

二：播放多个音乐文件

如给用户播放3个优惠信息的音乐文件，IVR放音动作的XML如下：

```xml
<response>
    <playlist finish_keys="#"><!-- 中断码,播放过程用户按#则结束-->
      <play>优惠信息1.wav</play>
      <play>优惠信息2.wav</play>
      <play>优惠信息3.wav</play>
    </playlist>
     <next>http://yourhost/nextstep</next>
</response>
```

## 例子

简单运用放音的例子：用户呼叫IVR号码，先播放一段音乐，播放完成则挂断。

下面是 Java 代码片段：

```java
@Controller
@RequestMapping("/rest/test/ivr")
public class RestTestCallCenterController {
    private static Logger logger =  LoggerFactory.getLogger(RestTestCallCenterController.class);
  //定义放音动作的XML（播放：欢迎引导音乐)  
  private static final String welcomeAction = "<response>\n" +
            "    <play finish_keys=\"#\">\n" +
            "      欢迎引导音乐.wav\n" +
            "    </play>\n" +
            "    <next>http://xxx/rest/test/ivr/end</next>\n" +
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
          return welcomeAction;//返回上面定义的放音动作
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
