import unittest
from check_policy_sources import transition, DocumentText, pdf_snapshot
class MonitorTests(unittest.TestCase):
    def test_lifecycle(self):
        r=transition({},'a','day1');self.assertEqual(r['state'],'baseline')
        r=transition(r,'a','day2');self.assertEqual(r['state'],'same')
        r=transition(r,'b','day3');self.assertEqual(r['state'],'changed')
        r=transition(r,'b','day4');self.assertEqual(r['state'],'changed')
        r=transition(r,None,'day5','HTTP 403');self.assertEqual(r['state'],'unavailable')
        r=transition(r,'b','day6');self.assertEqual(r['state'],'changed');self.assertEqual(r['baselineHash'],'a')
    def test_pdf_rejects_error_page_and_detects_file_change(self):
        with self.assertRaises(ValueError):pdf_snapshot(b'<html>404</html>')
        self.assertNotEqual(pdf_snapshot(b'%PDF-1.7 content-a'),pdf_snapshot(b'%PDF-1.7 content-b'))
    def test_navigation_ignored_body_changes_retained(self):
        def parse(nav,body):
            p=DocumentText();p.feed('<nav>'+nav+'</nav><main>'+body+'</main>');return p.text()
        body='Policy clause. '*60
        self.assertEqual(parse('a',body),parse('b',body))
        self.assertNotEqual(parse('a',body),parse('a',body+'new clause'))
if __name__=='__main__':unittest.main()
