SELECT title,location,eventemail,starts,ends,eventimage,eventdescription
FROM users JOIN events ON users.authid = events.authid;
