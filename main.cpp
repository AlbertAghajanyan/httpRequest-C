#include <iostream>
#include <string>
#include <curl/curl.h> //your directory may be different
using namespace std;

string data; //will hold the url's contents

size_t writeCallback(char* buf, size_t size, size_t nmemb, void* up) {
    //callback must have this declaration
    //buf is a pointer to the data that curl has for us
    //size*nmemb is the size of the buffer

    for (int i = 0; i < size * nmemb; ++i) {
        data.push_back(buf[i]);
    }
    return size*nmemb; //tell curl how many bytes we handled
}

int main() {
    CURL* curl; //our curl object

    curl_global_init(CURL_GLOBAL_ALL); //pretty obvious
    curl = curl_easy_init();

    curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:4300/cameras");
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, &writeCallback);
    curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L); //tell curl to output its progress

    curl_easy_perform(curl);

    cout << "DATA\n" << endl << data << endl;
    cin.get();

    curl_easy_cleanup(curl);
    curl_global_cleanup();

    return 0;
}
