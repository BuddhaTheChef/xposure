SELECT title,location,eventemail,starts,ends,eventimage,eventdescription,tags
FROM users JOIN events ON users.authid = events.authid;
