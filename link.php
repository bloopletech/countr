<?
include("inc.php");

$mode = $_GET["mode"];
$id = substr($_COOKIE["id"], 2);

if(!is_numeric($id)) die();

if($mode == "edittitle")
{
   doSql("UPDATE counters SET name='".esc($_GET["title"])."' WHERE id=$id");
}
else if($mode == "create")
{
   $row = doSql("SELECT id FROM couters WHERE id=$id");
   if(!$row || count($row) == 0) doSql("INSERT INTO counter_hits VALUES(NULL, $id, 'creation', ".$_GET["timestamp"].")");
}
else if($mode == "bump")
{
   if(!is_numeric($_GET["timestamp"])) die();

   doSql("UPDATE counters SET hits = hits + 1 WHERE id=$id");
   doSql("INSERT INTO counter_hits VALUES(NULL, $id, 'bump', ".$_GET["timestamp"].")");
}
else if($mode == "undo")
{
   doSql("UPDATE counters SET hits = hits - 1 WHERE id=$id");
   $row = doSql("SELECT id FROM counter_hits WHERE counter_id=$id AND type='bump' ORDER BY `when` DESC LIMIT 1");
   if($row) doSql("DELETE FROM counter_hits WHERE id=".$row["id"]." LIMIT 1");
}
else if($mode == "remove")
{
   if(!is_numeric($_GET["timestamp"])) die();

   if($_GET["type"] == "bump")
   {
      doSql("UPDATE counters SET hits = hits - 1 WHERE id=$id");
      doSql("DELETE FROM counter_hits WHERE counter_id=$id AND type='bump' AND `when`=".$_GET["timestamp"]." LIMIT 1");
   }
   else if($_GET["type"] == "reset")
   {
      doSql("UPDATE counters SET hits = 0 WHERE id=$id");
      doSql("DELETE FROM counter_hits WHERE counter_id=$id AND type='reset' AND `when`=".$_GET["timestamp"]." LIMIT 1");
   }
}
else if($mode == "reset")
{
   if(!is_numeric($_GET["timestamp"])) die();

   doSql("UPDATE counters SET hits = 0 WHERE id=$id");
   doSql("INSERT INTO counter_hits VALUES(NULL, $id, 'reset', ".$_GET["timestamp"].")");
}
else if($mode == "share")
{
   doSql("UPDATE counters SET share = 1 WHERE id=$id");
}
?>