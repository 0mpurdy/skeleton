package main

import "fmt"
import "flag"

func main() {

    port := flag.String("word", "default", "Description of word")

    flag.Parse()

    fmt.Printf("hello, world\n")
    fmt.Println("Example", *port)
}
