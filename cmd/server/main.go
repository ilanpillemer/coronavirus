package main

import (
	"flag"
	"log"
	"net/http"
)

var serve = flag.String("http", ":8080", "run as http server")

func main() {
	flag.Parse()
	log.Println("preparing server")
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world"))
	})
	log.Printf("starting server at%s", *serve)
	log.Fatal(http.ListenAndServe(*serve, nil))
}
