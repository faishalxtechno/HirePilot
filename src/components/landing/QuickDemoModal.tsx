import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';

interface QuickDemoModalProps {
  visible: boolean;
  onHide: () => void;
}

export const QuickDemoModal: React.FC<QuickDemoModalProps> = ({ visible, onHide }) => {
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);
  const [sampleAnswer, setSampleAnswer] = useState(
    'I would implement a Token Bucket algorithm backed by Redis. To prevent distributed race conditions under high concurrency, I would use atomic Redis Lua scripts to fetch and decrement remaining tokens in an O(1) single round-trip.'
  );

  const handleRunEvaluation = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
      toastRef.current?.show({
        severity: 'success',
        summary: 'Evaluation Complete',
        detail: 'AI scored your response at 93/100! Ready to practice real questions?',
        life: 4000,
      });
    }, 1200);
  };

  const handleStartRealInterview = () => {
    onHide();
    navigate('/interview/setup');
  };

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <Dialog
        header={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8750FF] flex items-center justify-center text-white">
              <i className="pi pi-bolt text-xs" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">HirePilot AI Practice Studio</h3>
              <p className="text-[11px] font-mono text-slate-500">Live AI Evaluation Demo</p>
            </div>
          </div>
        }
        visible={visible}
        onHide={onHide}
        className="remasto-dialog w-full max-w-xl mx-4 !rounded-3xl overflow-hidden"
        modal
      >
        <div className="space-y-4 pt-2">
          
          {/* Question banner */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="flex items-center justify-between mb-1">
              <Tag value="Sample Question" className="!bg-[#8750FF] !text-white !text-[10px] !px-2" />
              <span className="text-[11px] font-mono text-slate-500">Systems Track</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              &ldquo;Explain how you would implement a distributed rate limiter to handle high-throughput traffic spikes across multiple microservices.&rdquo;
            </p>
          </div>

          {/* Sample Candidate Answer */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Candidate Answer:</span>
              <span className="text-[11px] font-mono text-slate-400">Editable preview</span>
            </label>
            <textarea
              rows={4}
              value={sampleAnswer}
              onChange={(e) => setSampleAnswer(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8750FF]/40 leading-relaxed resize-none"
            />
          </div>

          {/* Evaluated Scorecard */}
          {evaluated && (
            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm space-y-3 animate-fade-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">Gemini Pro Evaluation Result</span>
                <span className="text-xs font-mono font-bold text-[#8750FF] bg-purple-50 px-2 py-0.5 rounded-md">
                  Score: 93 / 100
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-[10px] text-slate-400">Tech Depth</div>
                  <div className="font-bold text-slate-800">95%</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-[10px] text-slate-400">Clarity</div>
                  <div className="font-bold text-slate-800">92%</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-[10px] text-slate-400">Edge Cases</div>
                  <div className="font-bold text-slate-800">90%</div>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Feedback:</strong> Strong utilization of Redis Lua scripts for concurrency safety. Consider discussing fallback strategies in case of cluster cache failure.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
            {!evaluated ? (
              <Button
                label={evaluating ? 'Analyzing with AI...' : 'Evaluate Answer'}
                icon={evaluating ? 'pi pi-spin pi-spinner' : 'pi pi-sparkles'}
                disabled={evaluating || !sampleAnswer.trim()}
                onClick={handleRunEvaluation}
                className="w-full sm:w-auto !rounded-full !bg-[#8750FF] !border-[#8750FF] !text-white !font-bold !py-2.5 !px-5 !text-xs hover:!bg-[#723DE8]"
              />
            ) : (
              <Button
                label="Launch Full Practice Session"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={handleStartRealInterview}
                className="w-full sm:w-auto !rounded-full !bg-[#8750FF] !border-[#8750FF] !text-white !font-bold !py-2.5 !px-5 !text-xs hover:!bg-[#723DE8]"
              />
            )}
          </div>

        </div>
      </Dialog>
    </>
  );
};

export default QuickDemoModal;
