//https://www.jasom.net/how-to-install-curl-command-manually-on-debian-linux
//https://curl.haxx.se/download.html

#include <stdio.h>
#include <curl/curl.h>
#include <iostream>
#include <string>
using namespace std;

string data; //will hold the url's contents

size_t writeCallback(char* buf, size_t size, size_t nmemb, void* up) {
    //callback must have this declaration
    //buf is a pointer to the data that curl has for us
    //size*nmemb is the size of the buffer

    for (int c = 0; c<size*nmemb; c++) {
        data.push_back(buf[c]);
    }
    return size*nmemb; //tell curl how many bytes we handled
}

int main(void)
{
    CURL *curl;
    CURLcode res;

    /* In windows, this will init the winsock stuff */ 
    curl_global_init(CURL_GLOBAL_ALL);

    /* get a curl handle */ 
    curl = curl_easy_init();
    if(curl) {
        /* First set the URL that is about to receive our POST. This URL can
        just as well be a https:// URL if that is what should receive the
        data.*/ 
        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:4300/insert");
        /*Now specify the POST data */ 
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "type=people&cameraName=Camera-1&firstDetectedDate=2017-01-01 12:03:00");


        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, &writeCallback);
        curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L); //tell curl to output its progress


        /* Perform the request, res will get the return code */ 
        res = curl_easy_perform(curl);
        cout << "DATA\n" << endl << data << endl;
        /* Check for errors */ 
        if(res != CURLE_OK) {
            cout << "eeeeeeeeee" << endl;
            fprintf(stderr, "curl_easy_perform() failed: %s\n",curl_easy_strerror(res));
        }
        /* always cleanup */ 
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}
