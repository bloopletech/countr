<?
include("inc.php");

$id = -1;

if(isset($_GET["id"]) && is_numeric($_GET["id"]))
{
   $id = $_GET["id"];

   setcookie("id", "id$id", time() + 3600*24*14);
}
else if(!isset($_COOKIE["id"]))
{
   doSql("INSERT INTO counters VALUES(NULL, '', 0, 0)");
   $row = doSql("SELECT LAST_INSERT_ID() AS id");
   $id = $row["id"];

   setcookie("id", "id$id", time() + 3600*24*14);
}
else
{
   $id = substr($_COOKIE["id"], 2);
   if(!is_numeric($id)) die();
   setcookie("id", "id$id", time() + 3600*24*14);
}

$counter = doSql("SELECT * FROM counters WHERE id=$id");
?>   
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Countr</title>
<link rel="StyleSheet" type="text/css" href="style.css" />
<link rel="StyleSheet" type="text/css" href="style-screen.css" media="screen" />
<link rel="StyleSheet" type="text/css" href="style-handheld.css" media="handheld" />
<script type="text/javascript" src="scripts/js.js"></script>
<!--[if lt IE 7]>
<script defer type="text/javascript" src="scripts/pngfix.js"></script>
<![endif]-->

<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body id="body">
<div id="id"><?=$id;?></div>

<div class="header">
<div class="alpha"><a href="http://coderplay.blogspot.com/"><img src="images/alpha.png" alt="alpha" style="width: 110px; height: 110px;" /></a></div>
<img src="images/logo.png" alt="Countr" style="width: 148px; height: 61px;" />
</div>

<div class="mainbody">
   <div id="bodywrap" class="bodywrap"></div>
   

   <form onsubmit="return false;">
      <p class="mast">This page lets you count stuff. Anything you want, cups of coffee, cigarettes, web 2.0 sites :). Just click the &quot;Bump Counter&quot;
      button to increase the count. Of course, the count will be saved so you can come back
      to this page whenever you want. You can change the title below by just clicking on "&lt;things&gt;".
      </p>
      <div id="switchbar">
         <div id="switchwrap">
            <a href="#" onclick="changeComputer();"><img src="images/switch.png" style="width: 16px; height: 16px;" /> <span>Switch Computers</span></a>
          </div>
         <div class="clear"></div>
      </div>
      <div id="countbodywrap">
         <h2><span id="count"><?=($counter["hits"] > 0 ? $counter["hits"] : "0");?></span> <span id="counttitle" onclick="editTitle();"><?=($counter["name"] != "" ? usc($counter["name"]) : "&lt;things&gt;");?></span><input type="text" id="titleinput" onblur="finishedEditTitle();" /> counted</h2>
      
         <div id="buttons-wrap">
            <div id="bumpbutton-wrap"><button id="bumpbutton" onclick="bumpCounter();"><img src="images/bump.gif" style="width: 32px; height: 32px;" /> <span>Bump Counter</span></button></div>
            <div id="resetbutton-wrap"><button id="resetbutton" onclick="resetCounter();"><img src="images/reset.gif" style="width: 16px; height: 16px;" /> <span>Reset Counter</span></button></div>
         </div>

         <div id="counttablewrap">
            <table id="counttable">
               <thead>
                  <tr>
                     <td>Count</td>
                     <td>Type</td>
                     <td>When</td>
                     <td class="hidden"></td>
                     <td></td>
                  </tr>
               </thead>

               <tbody id="counttablebody">
               <?
               $rows = doSql("SELECT * FROM counter_hits WHERE counter_id=$id ORDER BY `when` ASC");

               if($rows && (count($rows) > 0))
               {
                  $hits = 1;
                  for($i = 0; $i < count($rows); $i++)
                  {
                     $row =& $rows[$i];

                     if($row["type"] == "reset")
                     {
                        $row["hits"] = "0";
                        $hits = 1;
                     }
                     else if($row["type"] == "bump")
                     {
                        $row["hits"] = $hits;
                        $hits++;
                     }
                     else if($row["type"] == "creation")
                     {
                        $row["hits"] = "0";
                        $hits = 1;
                     }
                  }

                  $rows = array_reverse($rows);

                  foreach($rows as $row)
                  {
                     ?><tr><td><?=$row["hits"];?></td><td><?=ucfirst($row["type"]);?></td><td><?=$row["when"];?></td><td class="hidden"><?=$row["when"];?></td><td><img <?=($row["type"] != "creation" ? "src=\"images/remove.png\" onclick=\"remove(this.parentNode.parentNode);\"" : "src=\"images/blank.png\"");?> style="width: 16px; height: 16px;" /></td></tr><?
                  }
               }
               ?>
               </tbody>
            </table>
         </div>
      </div>
   </form>
   <div class="footer">Check out my portfolio at <a href="http://i.budgetwebdesign.org">i.budgetwebdesign.org</a>. &copy; Brenton Fletcher. Comments? e-mail me: <a href="mailto:impactbc@hotmail.com">impactbc@hotmail.com</a>.</div>
</body>
</html>