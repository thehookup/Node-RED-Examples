msg.payload = 
{
  "data": 
  {
    "message": msg.windowName,
    "data": 
    {
      "push": 
      {
        "badge": 5,
        "category": "siren"
      },
      "attachment": 
      {
        "url": msg.image,
        "content-type": "jpeg",
        "hide-thumbnail": false
      }
    }
  }
}
return msg;