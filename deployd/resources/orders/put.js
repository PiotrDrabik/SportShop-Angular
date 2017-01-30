if (me === undefined || me.username != "admin") {
    cancel("brak autoryzacji", 401);
}