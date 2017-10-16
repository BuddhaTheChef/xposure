SELECT title,location,start,ends,image,description,authid
FROM users JOIN savedevents ON users.authid = savedevents.authid;
