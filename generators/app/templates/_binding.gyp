{
  "targets": [
    {
      "target_name": "main",
      "sources": [ "src/main.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
