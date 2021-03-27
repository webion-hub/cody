dotnet publish -c Release -r centos.8-x64 -o ./pub_out
rsync -azP ./pub_out/ root@185.229.236.134:cody