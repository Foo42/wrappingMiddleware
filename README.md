##Description
Skeleton middleware for creation of middleware which perform some processing at the start and end of a request. Behaviour is customised by providing start and end functions which are executed at the respective points. Removes a small piece of friction when making middlewares such as active request counters which might increment a counter in start, and decrement it in end.
