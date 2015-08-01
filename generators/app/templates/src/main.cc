#include <iostream>
#include <node.h>
#include <nan.h>
#include <v8.h>

using namespace v8;

void Method(const v8::FunctionCallbackInfo<Value>& args) {
    std::cout << "has 'foo'" << std::endl;
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void Init(Handle<Object> exports) {
    Isolate* isolate = Isolate::GetCurrent();
    exports->Set(String::NewFromUtf8(isolate, "hello"),
                 FunctionTemplate::New(isolate, Method)->GetFunction());
}

NODE_MODULE(hello, Init)
