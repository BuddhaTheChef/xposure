UPDATE users SET
profilepic= $2
WHERE authid = $1
RETURNING profilepic;

-- INSERT INTO users (first_name, last_name, email, profilepic, authid) VALUES ($2,$3,$4,$1,$5);

-- person.first,person.last,person.email,image , userInfo
