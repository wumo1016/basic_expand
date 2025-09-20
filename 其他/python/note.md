## python 版本管理工具(mac)

```sh
# 安装Pyenv（如果尚未安装）
brew install pyenv

# 在shell配置文件中初始化Pyenv（如~/.zshrc或~/.bash_profile）
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc

# 在shell配置文件中初始化Pyenv（如~/.zshrc或~/.bash_profile）
pyenv install 3.9.18


# 全局或局部设置Python版本为3.9.18
pyenv global 3.9.18

# 或者在项目目录下设置
pyenv local 3.9.18

# 确保node-gyp使用这个Python版本
npm config set python /Users/wumo/.pyenv/versions/3.9.18/bin/python
```
