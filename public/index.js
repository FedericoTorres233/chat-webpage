function scrollToBottom(){
    var div = $("#chat-window");
    div.animate({
    scrollTop: div[0].scrollHeight},'fast');
    return false;
  };