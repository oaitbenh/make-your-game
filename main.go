package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func Fetch() {
	// Define the form data
	data := map[string]string{
		"title":   "sfsger",
		"content": "rrgewgergre rty tryjbre retert 4yrt yuj yjjty rt g vjibpnritgjb btrb rtbrte\nyohjoibrtnkbn oi jti gjkrt lhkngbm g\nb tnbl mtk thyymuku",
		"type":    "Art",
	}

	// Convert the data to JSON format
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new request
	url := "http://10.1.14.6:8080/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set headers and cookies
	req.Header.Set("Content-Type", "application/json")
	req.AddCookie(&http.Cookie{
		Name:  "session_token",
		Value: "ywkqj0loT1Dt6CCXIRdTuXbSC8uI2idP9zB5tP4EuJ4=",
	})

	// Create an HTTP client and send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// Print the response status
	fmt.Println("Response status:", resp.Status)
}

func main() {
	for {
		go Fetch()
	}
}
