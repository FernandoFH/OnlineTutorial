package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func main() {
	router := http.NewServeMux()

	router.HandleFunc("GET /notas", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Obteniendo todas las notas"))
	})

	router.HandleFunc("GET /notas/{id}", func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid to parse id", http.StatusBadRequest)
			return
		}
		fmt.Fprintf(w, "notas by id: %d", id)
	})

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	log.Println("Listening on port: ", server.Addr)

	server.ListenAndServe()
}
