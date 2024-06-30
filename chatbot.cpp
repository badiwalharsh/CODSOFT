#include<iostream>
#include<string>
using namespace std;

int main(){
    cout<<"Hello! I am SIRI. How can I help you?"<<endl;

    while(true)
    {
        cout<<"You: ";
        string  input;
        getline(cin, input);

        for(char &c: input)
        {
            c=tolower(c);
        }

        if(input == "hi" || input == "hello" || input == "hey")
        {
            cout<<"SIRI: Hello! How can I assist you?"<<endl;
        }
        else if(input.find("your name") != string::npos)
        {
            cout<<"SIRI: I am a simple chatbot. I am here to assist you."<<endl;
        }
        else if(input.find("how are you") != string::npos)
        {
            cout<<"I am just a bunch of code, but i can help you!"<<endl;
        }
        else if(input.find("translate this in") != string::npos)
        {
            cout<<"SIRI: I can't do this, but I can help you."<<endl;
        }
        else if(input == "bye")
        {
            cout<<"SIRI: Goodbye! Have a nice day!"<<endl;
            break;
        }
        else if(input.find("time") != string::npos)
        {
            cout<<"SIRI: I can't tell time, but you can check your device for current time."<<endl;
        }
        else if(input.find("help") != string::npos)
        {
            cout<<"SIRI: I am here to help you with some basic inputs, you can say 'hi', ask about my name, or say 'bye' to end conversation."<<endl;
        }
        else{
            cout<<"SIRI: I'm sorry, I don't understand that. Please type again clearly."<<endl;
        }
    }
}