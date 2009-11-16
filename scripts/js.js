//Code copyright (c) Brenton Fletcher 2006-2007.
//Check out my portfolio at http://i.budgetwebdesign.org

function $(ele)
{
   var t = document.getElementById(ele);
   if(t == null) t = document.getElementsByName(ele);
   if(t.length == 1) t = t.item(0);
   return t;
}

function pad(str)
{
   str = str + "";
   if(str.length == 0) return "00";
   if(str.length == 1) return "0" + str;
   if(str.length == 2) return str;
}

var http = null;
var callback = null;

function loadURL(str, inCallback)
{
   callback = inCallback;
   http.open("get", str, true);
   http.onreadystatechange = gotURL;
   http.send(null);
}

function gotURL()
{
   if(http.readyState == 4)
   {
      if(callback != null)
      {
         callback(http.responseText);
      }
   }
}

function editTitle()
{
   title = (document.all ? $("counttitle").innerText : $("counttitle").textContent);
   $("titleinput").value = title;
   $("counttitle").style.display = "none";
   $("titleinput").style.display = "inline";

   setTimeout(function() { $("titleinput").focus(); }, 50);
}

function finishedEditTitle()
{
   title = $("titleinput").value;

   $("counttitle").innerText = title;
   $("counttitle").textContent = title;
   $("counttitle").style.display = "inline";
   $("titleinput").style.display = "none";

   loadURL("link.php?mode=edittitle&title=" + title, null);
}

function initDates()
{
   nodes = $("counttablebody").childNodes;
   for(i = 0; i < nodes.length; i++)
   {
      tr = nodes.item(i);
      if(tr.tagName != "TR") continue;

      when = new Date(parseInt(tr.childNodes.item(3).innerHTML));
      tr.childNodes.item(2).innerHTML = pad(when.getDate()) + "-" + pad(when.getMonth() + 1) + "-" + when.getFullYear() + " "
       + pad(when.getHours() > 12 ? when.getHours() - 12 : (when.getHours() == 0 ? 12 : when.getHours())) + ":"
        + pad(when.getMinutes()) + ":" + pad(when.getSeconds()) + " " + (when.getHours() > 11 ? "PM" : "AM");
   }
}

var currentWidth = 0;
function initTableWrap()
{
   if($("counttable").offsetWidth == currentWidth) return;

   $("counttablewrap").style.width = $("counttable").offsetWidth + 20 + "px";
   currentWindth = $("counttable").offsetWidth;
}

var allDisabled = false;

function disableAll()
{
   $("bumpbutton").disabled = "disabled";
   $("resetbutton").disabled = "disabled";
   $("changebutton").disabled = "disabled";

   var imgs = document.getElementsByTagName("img");
   for(i = 0; i < imgs.length; i++)
   {
      if(imgs[i].src == "images/remove.png") imgs[i].src = "images/remove-off.png";
   }

   allDisabled = true;
}

function enableAll()
{
   $("bumpbutton").disabled = null;
   $("resetbutton").disabled = null;
   $("changebutton").disabled = null;

   var imgs = document.getElementsByTagName("img");
   for(i = 0; i < imgs.length; i++)
   {
      if(imgs[i].src == "images/remove-off.png") imgs[i].src = "images/remove.png";
   }

   allDisabled = false;
}

function bumpCounter()
{
   disableAll();

   when = new Date();
   $("count").innerHTML = parseInt($("count").innerHTML) + 1 + "";

   var row = $("counttablebody").insertRow(0);
   
   var count = row.insertCell(-1);
   count.innerHTML = $("count").innerHTML;

   var type = row.insertCell(-1);
   type.innerHTML = "Bump";

   var whentd = row.insertCell(-1);
   whentd.innerHTML = pad(when.getDate()) + "-" + pad(when.getMonth() + 1) + "-" + when.getFullYear() + " "
                       + pad(when.getHours() > 11 ? when.getHours() - 12 : when.getHours()) + ":" + pad(when.getMinutes()) + ":" + pad(when.getSeconds())
                        + " " + (when.getHours() > 11 ? "PM" : "AM");
   
   var whentd2 = row.insertCell(-1);
   whentd2.innerHTML = when.getTime();
   whentd2.className = "hidden";

   var rem = row.insertCell(-1);
   rem.innerHTML = "<img src='images/remove.png' onclick='remove(this.parentNode.parentNode);' style='width: 16px; height: 16px;' />";

   loadURL("link.php?mode=bump&timestamp=" + when.getTime(), function (str) { enableAll(); });
}

function resetCounter()
{
   disableAll();

   when = new Date();
   $("count").innerHTML = "0";

   var row = $("counttablebody").insertRow(0);
   
   var count = row.insertCell(-1);
   count.innerHTML = "0";

   var type = row.insertCell(-1);
   type.innerHTML = "Reset";

   var whentd = row.insertCell(-1);
   whentd.innerHTML = pad(when.getDate()) + "-" + pad(when.getMonth() + 1) + "-" + when.getFullYear() + " "
                       + pad(when.getHours() > 11 ? when.getHours() - 12 : when.getHours()) + ":" + pad(when.getMinutes()) + ":" + pad(when.getSeconds())
                        + " " + (when.getHours() > 11 ? "PM" : "AM");

   var whentd2 = row.insertCell(-1);
   whentd2.innerHTML = when.getTime();
   whentd2.className = "hidden";

   var rem = row.insertCell(-1);
   rem.innerHTML = "<img src='images/remove.png' onclick='remove(this.parentNode.parentNode);' style='width: 16px; height: 16px;' />";

   loadURL("link.php?mode=reset&timestamp=" + when.getTime(), function (str) { enableAll(); });
}

function createCounter()
{
   disableAll();

   when = new Date();

   var row = $("counttablebody").insertRow(0);
   
   var count = row.insertCell(-1);
   count.innerHTML = "0";

   var type = row.insertCell(-1);
   type.innerHTML = "Creation";

   var whentd = row.insertCell(-1);
   whentd.innerHTML = pad(when.getDate()) + "-" + pad(when.getMonth() + 1) + "-" + when.getFullYear() + " "
                       + pad(when.getHours() > 11 ? when.getHours() - 12 : when.getHours()) + ":" + pad(when.getMinutes()) + ":" + pad(when.getSeconds())
                        + " " + (when.getHours() > 11 ? "PM" : "AM");
   
   var whentd2 = row.insertCell(-1);
   whentd2.innerHTML = when.getTime();
   whentd2.className = "hidden";

   var rem = row.insertCell(-1);
   rem.innerHTML = "<img src='images/blank.png' style='width: 16px; height: 16px;' />";

   loadURL("link.php?mode=create&timestamp=" + when.getTime(), function (str) { enableAll(); });
}

function remove(node)
{
   if(allDisabled) return;
   disableAll();

   nodes = node.childNodes;
   if(nodes.item(1).innerHTML == "Bump")
   {
      $("count").innerHTML = parseInt($("count").innerHTML) - 1 + "";

      tr = node.previousSibling;
      while(tr && tr.tagName && tr.tagName == "TR")
      {
         if(tr.childNodes.item(1).innerHTML == "Bump")
         {
            tr.childNodes.item(0).innerHTML = parseInt(tr.childNodes.item(0).innerHTML) - 1 + "";
         }
         else
         {
            break;
         }

         tr = tr.previousSibling;
      }

      loadURL("link.php?mode=remove&type=bump&timestamp=" + nodes.item(3).innerHTML, function (str) { enableAll(); });
   }
   else if(nodes.item(1).innerHTML == "Reset")
   {
      hits = 0;

      tr = nodes.item(1).nextSibling;
      if(tr && (tr.childNodes.item(1).innerHTML == "Bump")) hits = parseInt(tr.childNodes.item(0).innerHTML) + 1;

      tr = node.previousSibling;
      while(tr && tr.tagName && tr.tagName == "TR")
      {
         if(tr.childNodes.item(1).innerHTML == "Bump")
         {
            tr.childNodes.item(0).innerHTML = hits + "";
            hits++;
         }
         else
         {
            break;
         }

         tr = tr.previousSibling;
      }

      if(hits == 0) hits = 1;
      $("count").innerHTML = hits - 1 + "";

      loadURL("link.php?mode=remove&type=reset&timestamp=" + nodes.item(3).innerHTML, function (str) { enableAll(); });
   }

   $("counttablebody").removeChild(node);
}

function changeComputer()
{
   alert("To use this counter on another computer, use this URL:\nhttp://countr.budgetwebdesign.org/" + (document.all ? $("id").innerText : $("id").textContent));
}

function load()
{
   if(arguments.callee.done) return;
   arguments.callee.done = true;

   try
   {
      http = new ActiveXObject("Microsoft.XMLHTTP");
   }
   catch(e)
   {
      try
      {
         http = new XMLHttpRequest();
      }
      catch(e)
      {
      }
   }

   initDates();
   setInterval(initTableWrap, 10);

   if($("counttitle").innerHTML == "") editTitle();
   if($("counttablebody").childNodes.length <= 1) createCounter();
}

// for Internet Explorer (using conditional comments)
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function()
{
	if(this.readyState == "complete") load();
};
/*@end @*/

if(document.addEventListener) document.addEventListener("DOMContentLoaded", load, false);

window.onload = load;