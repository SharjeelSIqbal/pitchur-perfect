insert into "users" ("username", "hashPassword")
values ('Sharjello', 'fakeHashPassword1');


insert into "recordings" ("userId", "url", "title", "recordingLength")
values (1, '/voice/voice-recordings-1', 'first-attempt', '01:30');

insert into "favorite" ("userId", "recordingId")
values(1, 1);
