package main

import (
	"flag"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"path"
)

var serve = flag.String("http", ":8080", "run as http server")

func main() {
	flag.Parse()
	log.Println("preparing server")
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world"))
	})

	http.HandleFunc("/corona", corona)
	http.HandleFunc("/", simpleFileServer)
	log.Printf("starting server at%s", *serve)
	log.Fatal(http.ListenAndServe(*serve, nil))
}

func corona(w http.ResponseWriter, r *http.Request) {
	contents, err := ioutil.ReadFile("index.html")
	if err != nil {
		log.Println(err)
	}
	tmpl, err := template.New("corona").Parse(string(contents))
	if err != nil {
		log.Println(err)
	}

	err = tmpl.Execute(w, struct{}{})
	if err != nil {
		log.Println(err)
	}
}

//simpleFileServer implements a very simple file server. It only serves
//files that exist in the data directory. It only uses the base of
//the path and ignores any directories
func simpleFileServer(w http.ResponseWriter, r *http.Request) {
	u, err := url.Parse(r.URL.String())
	if err != nil {
		log.Println(err)
		w.WriteHeader(409)
		return
	}
	err = serveFile(w, "data/"+path.Base(u.String()))
	if err != nil {
		log.Println(err)
		w.WriteHeader(409)
		return
	}
}

//serveFile serves the file to the writer
func serveFile(w io.Writer, name string) error {
	contents, err := ioutil.ReadFile(name)
	if err != nil {
		return err
	}

	w.Write(contents)
	return nil
}
