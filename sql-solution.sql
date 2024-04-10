-- Answer #1
SELECT o.AGENT_CODE, 
a.AGENT_NAME, 
SUM(o.ORD_AMOUNT) AS total_order_amount 
FROM orders o 
JOIN agents a ON o.AGENT_CODE = a.AGENT_CODE
GROUP BY o.AGENT_CODE, a.AGENT_NAME
ORDER BY total_order_amount DESC 
LIMIT 1;
-- Answer #2
SELECT 
c.CUST_CODE,
c.CUST_NAME, 
SUM(o.ORD_AMOUNT) AS total_spent 
from customer c
JOIN orders o ON c.CUST_CODE = o.CUST_CODE
GROUP BY c.CUST_CODE, c.CUST_NAME
HAVING total_spent > 5000
ORDER BY total_spent DESC;
-- Answer #3
SELECT o.AGENT_CODE,
COUNT(*) as total_order 
FROM orders o
WHERE o.ORD_DATE BETWEEN '2008-07-01' AND '2008-07-31'
GROUP BY o.AGENT_CODE
ORDER BY total_order DESC;
