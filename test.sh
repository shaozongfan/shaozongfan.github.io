#!/usr/bin/env bash
# 修复 Docusaurus 中 Markdown 文件里误被当作 JSX 的尖括号
# 用法：bash fix-jsx-tags.sh

set -euo pipefail

# 需要转义的“标签”列表（key=原始 value=转义后）
declare -A map=(
  ["<kernel-version>"]="&lt;kernel-version&gt;"
  ["<model>"]="&lt;model&gt;"
  ["<manufacturer>"]="&lt;manufacturer&gt;"
  ["<linenum>"]="&lt;linenum&gt;"
  ["<port>"]="&lt;port&gt;"
  ["<host_ip>"]="&lt;host_ip&gt;"
  ["<addr>"]="&lt;addr&gt;"
  ["<size>"]="&lt;size&gt;"
)

# 判断 sed 语法
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED="sed -i ''"
else
  SED="sed -i"
fi

# 找出所有 md 文件
mapfile -t files < <(find . -type f -name "*.md")
if ((${#files[@]} == 0)); then
  echo "未找到 docs/ 下的 .md 文件，脚本退出"
  exit 0
fi

echo "即将处理以下文件："
printf '  %s\n' "${files[@]}"
read -rp "确认继续？(y/N) " confirm
[[ "$confirm" != [yY] ]] && echo "已取消" && exit 0

# 开始替换
for f in "${files[@]}"; do
  for key in "${!map[@]}"; do
    $SED "s|$key|${map[$key]}|g" "$f"
  done
done

echo "修复完成！"